import { resolve, dirname as _dirname } from 'path'
import _fs, { existsSync, readFileSync } from 'fs'
const { promises: fs } = _fs

class Database {
    /**
     * Create new Database
     * @param {String} filepath Path to specified json database
     * @param  {...any} args JSON.stringify arguments
     */
    constructor(filepath, ...args) {
        this.file = resolve(filepath)
        this.logger = console
        
        this._load()

        this._jsonargs = args
        this._state = false
        this._queue = []
        this._interval = setInterval(async () => {
            if (!this._state && this._queue && this._queue.length > 0) {
                this._state = true
                const method = this._queue.shift()
                if (typeof this[method] === 'function') {
                    await this[method]().catch(this.logger.error)
                }
                this._state = false
            }
        }, 1000)
    }

    get data() {
        return this._data
    }

    set data(value) {
        this._data = value
        this.save()
    }

    /**
     * Queue Load
     */
    load() {
        this._queue.push('_load')
    }

    /**
     * Queue Save
     */
    save() {
        this._queue.push('_save')
    }

    _load() {
        try {
            if (existsSync(this.file)) {
                const data = readFileSync(this.file, 'utf-8')
                this._data = JSON.parse(data)
            } else {
                this._data = {}
            }
            return this._data
        } catch (e) {
            this.logger.error('Error loading database:', e)
            this._data = {}
            return this._data
        }
    }

    async _save() {
        try {
            let dirname = _dirname(this.file)
            if (!existsSync(dirname)) await fs.mkdir(dirname, { recursive: true })
            await fs.writeFile(this.file, JSON.stringify(this._data, ...this._jsonargs))
            return this.file
        } catch (e) {
            this.logger.error('Error saving database:', e)
            throw e
        }
    }

    /**
     * Cleanup interval
     */
    close() {
        if (this._interval) {
            clearInterval(this._interval)
            this._interval = null
        }
    }
}

export default Database