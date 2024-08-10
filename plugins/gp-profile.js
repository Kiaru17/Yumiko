
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { xpRange } from '../lib/levelling.js'
let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `🌸 ${mssg.userDb} 🌸`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn, genero, prem, coin, bank, language} = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = Kiara - xp
let premG = global.prems.includes(who.split`@`[0]) || prem
let sn = createHash('md5').update(who).digest('hex')

let str = `
 ♥⃟᮪〭۬̇〬⃟˖ꪶ 𝐏𝐄𝐑𝐅𝐈𝐋 ♥⃟᮪〭۬̇〬⃟˖ꪶ

 ⋆⃟ۣۜ᭪🌸➣.𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒: @${who.replace(/@.+/, '')} 
 ⋆⃟ۣۜ᭪🌸➣.𝐍𝐎𝐌𝐁𝐑𝐄:
 • ${username} ${registered ? '\n   • ' + name + ' ': ''} [✰]
 ⋆⃟ۣۜ᭪🌸➣.𝐍𝐔𝐌𝐄𝐑𝐎: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')} 
 ⋆⃟ۣۜ᭪🌸➣.𝐋𝐈𝐍𝐊: wa.me/${who.split`@`[0]}${registered ? `\n 𝐄𝐃𝐀𝐃: ${age}\n 𝐆𝐄𝐍𝐄𝐑𝐎: ${genero}` : ''}
 ⋆⃟ۣۜ᭪🌸➣.𝐈𝐃𝐈𝐎𝐌𝐀: ${language}
 ⋆⃟ۣۜ᭪🌸➣.𝐀𝐃𝐕: ${warn}/${maxwarn}
 ⋆⃟ۣۜ᭪🌸➣.𝐂𝐎𝐈𝐍𝐒: ${coin.toLocaleString()}
 ⋆⃟ۣۜ᭪🌸➣.𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄𝐒: ${diamond.toLocaleString()}
 ⋆⃟ۣۜ᭪🌸➣.𝐍𝐈𝐕𝐄𝐋: ${level}
 ⋆⃟ۣۜ᭪🌸➣.𝐗𝐏: ${mssg.total} ${exp}
 ⋆⃟ۣۜ᭪🌸➣.𝐑𝐀𝐍𝐆𝐎: ${role}
 ⋆⃟ۣۜ᭪🌸➣.𝐑𝐄𝐆: ${registered ? '[✓]': '[メ]'}
 ⋆⃟ۣۜ᭪🌸➣.𝐏𝐑𝐄𝐌: ${premG ? '[✓]' : '[メ]'}

> ${mssg.ig}`
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false, { mentions: [who] })
    m.react(done)

}
handler.help = ['profile']
handler.tags = ['group']
handler.command = ['profile', 'perfil']

export default handler
