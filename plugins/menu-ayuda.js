//código creado por Karim-off
let handler = async (m, { conn, command, usedPrefix }) => {
let pp = 'https://telegra.ph/file/f064ccfeec87538fb6f61.jpg'
        m.react('🌸') 
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) { process.send('uptime')
_muptime = await new Promise(resolve => { process.once('message', resolve) 
setTimeout(resolve, 1000) }) * 1000}
let uptime = clockString(_uptime)
let estado = `
░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸

╔════════⫹♥⃟᮪〭۬̇〬⃟˖ꪶ⫺════════╗
║      𝐌𝐄𝐍𝐔 𝐏𝐑𝐈𝐍𝐂
╠════════⫹♥⃟᮪〭۬̇〬⃟˖ꪶ⫺════════╝
✧⃝━━━━━━━━⧔❍⃕⃟🌸⧕━━━━━━━✰
┃╭━─━─━──≪ ✧ ≫─━──━─━╮
┃  ⋆⃟ۣۜ᭪🌸➣.𝐁𝐎𝐓 𝐄𝐍 𝐃𝐄𝐒𝐀𝐑𝐎𝐋𝐋𝐎
┃  ⋆⃟ۣۜ᭪🌸➣.𝐂𝐑𝐄𝐀𝐃𝐎𝐑:Kiaru
┃  ⋆⃟ۣۜ᭪🌸➣.𝐌𝐄 𝐃𝐀𝐑𝐈𝐀𝐒 𝐔𝐍𝐀 ⭐?
┃  ⋆⃟ۣۜ᭪🌸➣.𝐔𝐍𝐄𝐓𝐄 𝐀𝐌𝐈 𝐂𝐀𝐍𝐀𝐋/𝐆𝐑𝐔𝐏𝐎𝐒
┃  ⋆⃟ۣۜ᭪🌸➣.𝐆𝐑𝐀𝐂𝐈𝐀𝐒🫦
┃╰━─━──━─≪ ♥⃟᮪〭۬̇〬⃟˖ꪶ ≫─━──━─━╯
  ━━━━━━━━⧔❍⃕⃟🌸⧕━━━━━━━
`
await conn.sendButton(m.chat, estado, '‎_BY_ : __.k.i.a.r.u._16_', pp, [
['𝐌𝐄𝐍𝐔♥⃟᮪〭۬̇〬⃟˖ꪶ', '.allmenu'], ['𝐎𝐖𝐍𝐄𝐑 ♥⃟᮪〭۬̇〬⃟˖ꪶ', '.owner']], null, [['𝐂𝐀𝐍𝐀𝐋♥⃟᮪〭۬̇〬⃟˖ꪶ', `${fgcanal}`]], m)
}
handler.help = ['menu']
handler.tags = ['info']
handler.command = /^(help?)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}