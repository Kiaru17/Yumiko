let handler = async function (m, { conn, text, usedPrefix }) {

    m.react('🗣️')

let m2 = `
░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸

╔════════⫹♥⃟᮪〭۬̇〬⃟˖ꪶ⫺════════╗
║    𝐌𝐄𝐍𝐔 メ 𝐀𝐔𝐃𝐈𝐎𝐒
╠════════♥⃟᮪〭۬̇〬⃟˖ꪶ════════╝
  ━━━━━━━━⧔❍⃕⃟🌸⧕━━━━━━━
┃╭━─━─━──≪ ♥⃟᮪〭۬̇〬⃟˖ꪶ ≫─━──━─━╮
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘢𝘳𝘢
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘧𝘪𝘯𝘰𝘴 𝘴𝘦𝘯̃𝘰𝘳𝘦𝘴
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘣𝘢𝘯̃𝘢𝘵𝘦
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘣𝘶𝘦𝘯𝘰𝘴 𝘥𝘪𝘢𝘴
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘥𝘪𝘢𝘨𝘯𝘰𝘴𝘵𝘪𝘤𝘰
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘦𝘭𝘮𝘰
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘱𝘶𝘵𝘰
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘨𝘦𝘮𝘪𝘥𝘰𝘴
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘱𝘰𝘣𝘳𝘦 𝘱𝘦𝘳𝘳𝘢
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘮𝘢𝘯𝘤𝘰
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘮𝘪𝘢𝘶
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘵𝘳𝘢𝘬𝘢
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘵𝘶𝘳𝘪𝘱
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘩𝘪𝘯𝘮𝘰 𝘱𝘰𝘵𝘢𝘹𝘪𝘦
┃  ⋆⃟ۣۜ᭪🌸➣ .𝘢
┃  ⋆⃟ۣۜ᭪🌸➣ .:𝘤
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

    await conn.reply(m.chat, '𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 𝐌𝐄𝐍𝐔♥⃟᮪〭۬̇〬⃟˖ꪶ', global.fcontact);
    // Alternativa: usa sendFile en lugar de reply si prefieres
    await conn.sendFile(m.chat, pp, 'menu.jpg', m2, m)
}

handler.help = ['menuaudios']
handler.tags = ['main']
handler.command = ['menuaudios', 'audiosmenu'] 

export default handler