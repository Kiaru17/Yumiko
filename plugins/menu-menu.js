//import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {
  'ai': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐈𝐀᠂࣭.⊰ ⃝༘⃕',
  'info': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐈𝐍𝐅𝐎᠂࣭⊰. ⃝༘⃕',
  'main': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐀𝐂𝐄𝐑𝐂𝐀 𝐃𝐄⊰᠂࣭. ⃝༘⃕',
  'bebot': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐒𝐔𝐁𝐒᠂࣭⊰. ⃝༘⃕',
  'game': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐆𝐀𝐌𝐄⊰᠂࣭. ⃝༘⃕',
  'convertir': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐂𝐎𝐍𝐕𝐄𝐑⊰᠂࣭. ⃝༘⃕',
  'econ': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀⊰᠂࣭. ⃝༘⃕',
  'rpg': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎⊰᠂࣭. ⃝༘⃕',
  'pop': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐏𝐎𝐏𝐔𝐋𝐀𝐑⊰᠂࣭. ⃝༘⃕',
  'sticker': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒⊰᠂࣭. ⃝༘⃕',
  'img': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐈𝐌𝐆⊰᠂࣭. ⃝༘⃕',
  'maker': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐌𝐀𝐊𝐄𝐑⊰᠂࣭. ⃝༘⃕',
  'prem': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐏𝐑𝐄𝐌᠂࣭⊰. ⃝༘⃕',
  'group': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏𝐎𝐒⊰᠂࣭. ⃝༘⃕',
  //'nable': '᠂࣭. ⃝༘⃕⊱ON/OFF OPCIONES⊰᠂࣭. ⃝༘⃕', 
  //'nime': '᠂࣭. ⃝༘⃕⊱ANIME᠂࣭⊰. ⃝༘⃕',
  'rnime': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐑𝐄𝐀𝐂𝐂⊰᠂࣭. ⃝༘⃕',
  'dl': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒⊰᠂࣭. ⃝༘⃕',
  'tools': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐓𝐎𝐎𝐋𝐒⊰᠂࣭. ⃝༘⃕',
  'fun': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐅𝐔𝐍⊰᠂࣭. ⃝༘⃕',
  'cmd': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄⊰᠂࣭. ⃝༘⃕',
  'nsfw': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐍𝐒𝐖𝐅⊰᠂࣭. ⃝༘⃕',
  'ansfw': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐍𝐒𝐖𝐅 𝐀𝐍𝐌⊰᠂࣭. ⃝༘⃕', 
  'owner': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐂𝐑𝐄𝐀𝐃𝐎𝐑⊰᠂࣭. ⃝༘⃕', 
  'advanced': '᠂࣭. ⃝༘⃕⊱𝐌𝐄𝐍𝐔 𝐀𝐕𝐀𝐍𝐂⊰᠂࣭. ⃝༘⃕',
}
const defaultMenu = {
  before: `
░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸

╔════════♥⃟᮪〭۬̇〬⃟˖ꪶ════════╗
║\t\t\t\t𝐈𝐍𝐅𝐎 𝐁𝐎𝐓
╠═══
╠ ঔৣ͜͡➳𝐌𝐎𝐃𝐎 : Público
╠ ঔৣ͜͡➳𝐁𝐀𝐈𝐋𝐄𝐘𝐒 : Multi Device
╠ ঔৣ͜͡➳𝐓𝐈𝐄𝐌𝐏𝐎 𝐎𝐍 : %muptime
╠ ঔৣ͜͡➳𝐔𝐒𝐄𝐑𝐒 : 133990
╚═══════════════════╝
%readmore
╔═══════♥⃟᮪〭۬̇〬⃟˖ꪶ════════╗
║\t\t\t 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑𝐒
╠═══
╠ 💸⃟ꦿ⸼𝐍𝐎𝐌𝐁𝐑𝐄 : %name
╠ 💸⃟ꦿ⸼𝐍𝐈𝐕𝐄𝐋 : %level
╠ 💸⃟ꦿ⸼𝐗𝐏 : %totalexp
╚═══════════════════╝
`.trimStart(),
  header: '╔════════♥⃟᮪〭۬̇〬⃟˖ꪶ════════╗\n║\t\t\t%category\n╠════════♥⃟᮪〭۬̇〬⃟˖ꪶ════════╝\n ⃙◌⃙◍━━━━━━━━♥⃟᮪〭۬̇〬⃟˖ꪶ━━━━━━━ ⃙◌⃙◍\n┃╭━─━─━──❍፝⃟༘─━──━─━╮',
  body: '┃  ⋆⃟ۣۜ᭪🌸➣ %cmd %isdiamond %isPremium',
  footer: '┃╰━─━──━─❍፝⃟༘─━──━─━╯\n ⃙◌⃙◍━━━━━━━━❍፝⃟༘━━━━━━━ ⃙◌⃙◍\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
     let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        diamond: plugin.diamond,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `🌸 Powered by FG98 https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      sbot: (conn.user.jid == global.conn.user.jid ? '' : `\n ⋆⃟ۣۜ᭪🌸➣ ✨ 𝐒𝐔𝐁 𝐁𝐎𝐓 𝐃𝐄:
\nwa.me/${global.conn.user.jid.split`@`[0]}`), 
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

global.fcontact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: "status@broadcast",
        },
        message: {
            contactMessage: {
                displayName: `\n ░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸 \n
𝐋𝐀 𝐌𝐄𝐉𝐎𝐑 𝐑𝐄𝐘𝐍𝐀`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:xd\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    let pp = 'https://i.ibb.co/j64r2PF/file.png'
    await conn.reply(m.chat, ' 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 メ 𝐌𝐄𝐍𝐔 シ︎', fcontact);

    /*conn.sendButton(m.chat, text.trim(), ` ⋆⃟ۣۜ᭪🌸➣ DyLux  ┃ ᴮᴼᵀ\n${mssg.ig}`, pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ], m, rpl)*/
    conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(),m, null, fwc)
    m.react('🌸') 

  } catch (e) {
    conn.reply(m.chat, '❎ 𝐋𝐎 𝐒𝐈𝐄𝐍𝐓𝐎, 𝐄𝐋 𝐌𝐄𝐍𝐔́ 𝐓𝐈𝐄𝐍𝐄 𝐔𝐍 𝐄𝐑𝐑𝐎𝐑', m)
    throw e
  }
}
//handler.help = ['help']
//handler.tags = ['main']
handler.command = ['allmenu','menúall'] 
handler.register = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;