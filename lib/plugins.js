import { readdirSync, existsSync, readFileSync, watch } from 'fs'
import { join, resolve } from 'path'
import { format } from 'util'
import syntaxerror from 'syntax-error'
import importFile from './import.js'
import Helper from './helper.js'

const __dirname = Helper.__dirname(import.meta)
const pluginFolder = join(__dirname, '../plugins/index')
const pluginFilter = filename => /\.(mc)?js$/.test(filename)

// inspired from https://github.com/Nurutomo/mahbod/blob/main/src/util/PluginManager.ts

let watcher, plugins, pluginFolders = []
watcher = plugins = {}

/**
 * Initialize plugins from folder
 * @param {String} folder Plugin folder path
 * @param {Function} filter File filter function
 * @param {Object} conn Bot connection object
 */
async function filesInit(folder = pluginFolder, filter = pluginFilter, conn) {
    const resolved = resolve(folder)
    if (resolved in watcher) return
    pluginFolders.push(resolved)

    await Promise.all(
        readdirSync(resolved)
            .filter(filter)
            .map(async filename => {
                try {
                    let file = join(resolved, filename)
                    const module = await import(file)
                    if (module) {
                        plugins[filename] = 'default' in module ? module.default : module
                    }
                } catch (e) {
                    conn?.logger?.error(`Error loading plugin '${filename}':`, e)
                    delete plugins[filename]
                }
            })
    )

    const watching = watch(resolved, reload.bind(null, conn, resolved, filter))
    watching.on('close', () => deletePluginFolder(resolved, true))
    watcher[resolved] = watching

    return plugins
}

/**
 * Delete plugin folder from watcher
 * @param {String} folder Plugin folder path
 * @param {Boolean} isAlreadyClosed Whether watcher is already closed
 */
function deletePluginFolder(folder, isAlreadyClosed = false) {
    const resolved = resolve(folder)
    if (!(resolved in watcher)) return
    if (!isAlreadyClosed) watcher[resolved].close()
    delete watcher[resolved]
    pluginFolders.splice(pluginFolders.indexOf(resolved), 1)
}

/**
 * Reload plugin on file change
 * @param {Object} conn Bot connection object
 * @param {String} pluginFolder Plugin folder path
 * @param {Function} pluginFilter File filter function
 * @param {String} _ev Watch event
 * @param {String} filename Changed file name
 */
async function reload(conn, pluginFolder = pluginFolder, pluginFilter = pluginFilter, _ev, filename) {
    if (!pluginFilter(filename)) return
    
    try {
        let dir = join(pluginFolder, filename)
        
        if (filename in plugins) {
            if (existsSync(dir)) {
                conn?.logger?.info(`🔄 updated plugin - '${filename}'`)
            } else {
                conn?.logger?.warn(`🗑️ deleted plugin - '${filename}'`)
                return delete plugins[filename]
            }
        } else {
            conn?.logger?.info(`✅ new plugin - '${filename}'`)
        }
        
        // Check for syntax errors
        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })
        
        if (err) {
            conn?.logger?.error(`❌ Syntax error in '${filename}':\n${format(err)}`)
            return
        }
        
        try {
            const module = await importFile(dir).catch(e => {
                throw new Error(`Failed to import '${filename}': ${e.message}`)
            })
            
            if (module) {
                plugins[filename] = 'default' in module ? module.default : module
            }
        } catch (e) {
            conn?.logger?.error(`❌ Error loading plugin '${filename}':\n${format(e)}`)
            return
        }
        
        // Sort plugins alphabetically
        plugins = Object.fromEntries(
            Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b))
        )
    } catch (e) {
        conn?.logger?.error(`❌ Unexpected error reloading '${filename}':\n${format(e)}`)
    }
}

export {
    pluginFolder,
    pluginFilter,
    plugins,
    watcher,
    pluginFolders,
    filesInit,
    deletePluginFolder,
    reload
}