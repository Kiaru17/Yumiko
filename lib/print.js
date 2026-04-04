import { WAMessageStubType } from '@whiskeysockets/baileys'
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import terminalImage from 'terminal-image'
import urlRegexSafe from 'url-regex-safe'

const __dirname = dirname(fileURLToPath(import.meta.url))
const urlRegex = urlRegexSafe({ strict: false })

/**
 * Print message information to console
 * @param {Object} m Message object
 * @param {Object} conn Connection object
 */
export default async function (m, conn = { user: {} }) {
  try {
    // Validate connection object
    if (!conn || typeof conn.getName !== 'function') {
      console.error('Invalid connection object')
      return
    }

    let _name = await conn.getName(m.sender)
    let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '')
    let chat = await conn.getName(m.chat)
    
    let img = null
    try {
      if (global.opts?.img && /sticker|image/gi.test(m.mtype)) {
        img = await terminalImage.buffer(await m.download())
      }
    } catch (e) {
      console.error('Error loading image:', e)
    }
    
    // Calculate file size
    let filesize = (m.msg ?
      m.msg.vcard ?
        m.msg.vcard.length :
        m.msg.fileLength ?
          m.msg.fileLength.low || m.msg.fileLength :
          m.msg.axolotlSenderKeyDistributionMessage ?
            m.msg.axolotlSenderKeyDistributionMessage.length :
            m.text ?
              m.text.length :
              0
      : m.text ? m.text.length : 0) || 0
    
    let user = global.DATABASE?.data?.users?.[m.sender]
    let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')
    
    console.log(`
${chalk.hex('#FE0041').bold('┎━─━─━─━─━─━─━━──━━──━')}
🤖 ${chalk.cyan('%s')} ⏱️ ${chalk.black(chalk.bgGreen('%s'))} 📂 ${chalk.black(chalk.bgGreen('%s'))} ${chalk.magenta('%s [%s %sB]')} 
👤 ${chalk.redBright('%s')} 🏦 ${chalk.yellow('%s%s')} ${chalk.blueBright('en')} 
👥 ${chalk.green('%s')} ${chalk.black(chalk.bgYellow('%s'))}
${chalk.hex('#FE0041').bold('┕━─━─━─━─━─━─━━──━━──━')}
`.trim(), 
      me + ' ~' + conn.user.name + `${conn.user.jid == global.conn?.user?.jid ? '' : ' (Sub Bot)'}`,
      
      (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toLocaleTimeString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' }),
      
      m.messageStubType ? WAMessageStubType[m.messageStubType] : '',
      filesize,
      filesize === 0 ? 0 : (filesize / Math.pow(1024, Math.floor(Math.log(filesize) / Math.log(1024)))).toFixed(1),
      ['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1024))] || '',
      sender,
      m ? m.exp : '?',
      user ? '|' + user.exp + '|' + user.diamond + '|' + user.level : '|0|0|0',
      m.chat + (chat ? ' ~ ' + chat : ''),
      m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
    )
    
    if (img) console.log(img.trimEnd())
    
    if (typeof m.text === 'string' && m.text) {
      let log = m.text.replace(/\u200e+/g, '')
      let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
      
      let mdFormat = (depth = 4) => (_, type, text, monospace) => {
        let types = {
          _: 'italic',
          '*': 'bold',
          '~': 'strikethrough'
        }
        text = text || monospace
        let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
        return formatted
      }
      
      if (log.length < 1024) {
        log = log.replace(urlRegex, (url, i, text) => {
          let end = url.length + i
          return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
        })
      }
      
      log = log.replace(mdRegex, mdFormat(4))
      
      if (m.mentionedJid) {
        for (let user of m.mentionedJid) {
          let mentionName = await conn.getName(user)
          log = log.replace('@' + user.split('@')[0], chalk.blueBright('@' + mentionName))
        }
      }
      
      console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
    }
    
    if (m.messageStubParameters) {
      console.log(m.messageStubParameters.map(jid => {
        jid = conn.decodeJid(jid)
        let name = conn.getName(jid)
        return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''))
      }).join(', '))
    }
    
    if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg?.fileName || m.msg?.displayName || 'Document'}`)
    else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 Contacts`)
    else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg?.displayName || 'Contact'}`)
    else if (/audio/i.test(m.mtype)) {
      const duration = m.msg?.seconds || 0
      console.log(`${m.msg?.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`)
    }

    console.log()
  } catch (e) {
    console.error('Error printing message:', e)
  }
}

// Hot reload on file change
let file = fileURLToPath(import.meta.url)
let watchers = new Set()

function setupWatcher() {
  if (watchers.has(file)) return
  
  const watcher = watchFile(file, () => {
    console.log(chalk.redBright("Update 'lib/print.js'"))
  })
  
  watchers.add(file)
}

setupWatcher()