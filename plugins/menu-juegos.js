let handler = async function (m, { conn, text, usedPrefix }) {
  
  m.react('🎮')
  
  let m2 = `
░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸

╔════════⫹♥⃟᮪〭۬̇〬⃟˖ꪶ⫺════════╗
║       𝐌𝐄𝐍𝐔 𝐆𝐀𝐌𝐄
╠════════⫹♥⃟᮪〭۬̇〬⃟˖ꪶ⫺════════╝
  ━━━━━━━━⧔❍⃕⃟🌸⧕━━━━━━━
┃╭━─━─━──≪ ♥⃟᮪〭۬̇〬⃟˖ꪶ ≫─━──━─━╮
┃ ✰ .acertijo
┃ ✰ .dado
┃  ⋆⃟ۣۜ᭪🌸➣ .mates <modo>
┃  ⋆⃟ۣۜ᭪🌸➣ .ppt
┃  ⋆⃟ۣۜ᭪🌸➣ .love
┃  ⋆⃟ۣۜ᭪🌸➣ .topgays
┃  ⋆⃟ۣۜ᭪🌸➣ .tototakus
┃  ⋆⃟ۣۜ᭪🌸➣ .toppotaxies
┃  ⋆⃟ۣۜ᭪🌸➣ .topintegrantes
┃  ⋆⃟ۣۜ᭪🌸➣ .topintegrante
┃  ⋆⃟ۣۜ᭪🌸➣ .toplagrasa
┃  ⋆⃟ۣۜ᭪🌸➣ .topgrasa
┃  ⋆⃟ۣۜ᭪🌸➣ .toppanafrescos
┃  ⋆⃟ۣۜ᭪🌸➣ .toppanafresco
┃  ⋆⃟ۣۜ᭪🌸➣ .topshiposters
┃  ⋆⃟ۣۜ᭪🌸➣ .topshipost
┃  ⋆⃟ۣۜ᭪🌸➣ .toppajer@s
┃  ⋆⃟ۣۜ᭪🌸➣ .toplindos
┃  ⋆⃟ۣۜ᭪🌸➣ .toplind@s
┃  ⋆⃟ۣۜ᭪🌸➣ .topput@s
┃  ⋆⃟ۣۜ᭪🌸➣ .topfamosos
┃  ⋆⃟ۣۜ᭪🌸➣ .topfamos@s
┃  ⋆⃟ۣۜ᭪🌸➣ .topparejas
┃  ⋆⃟ۣۜ᭪🌸➣ .top5parejas
┃  ⋆⃟ۣۜ᭪🌸➣ .slot <apuesta>
┃╰━─━──━─≪ ♥⃟᮪〭۬̇〬⃟˖ꪶ ≫─━──━─━╯
   ━━━━━━━━⧔❍⃕⃟🌸⧕━━━━━━━
`
  
  let pp = 'https://i.ibb.co/pnTYkw8/file.jpg'
  
  global.fcontact = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      remoteJid: "status@broadcast",
    },
    message: {
      contactMessage: {
        displayName: `\n ░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸 \n𝐋𝐀 𝐌𝐄𝐉𝐎𝐑 𝐑𝐄𝐘𝐍𝐀`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:xd\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };
  
  await conn.reply(m.chat, '✧͢⃟ᤢ🌸𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 𝐌𝐄𝐍𝐔✧͢⃟ᤢ🌸', global.fcontact);
  await conn.sendFile(m.chat, pp, 'menu.jpg', m2, m, null)
}

handler.help = ['menujuegos']
handler.tags = ['main']
handler.command = ['menujuegos', 'menugames']

export default handler