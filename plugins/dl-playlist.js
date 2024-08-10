
import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `🌸 ${mssg.example} 🌸 *${usedPrefix + command}* Lil Peep hate my life`;
    m.react('🫦');
    
    let result = await yts(text);
    let ytres = result.videos;
    

    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `${index}┃ ${v.title}`,
            rows: [
                {
                    header: ' ⋆⃟ۣۜ᭪🌸➣ MP3',
                    title: "",
                    description: `▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.duration}:* ${v.timestamp}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.views}:* ${v.views}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.title}* : ${v.title}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.aploud}:* ${v.ago}\n`, 
                    id: `${usedPrefix}fgmp3 ${v.url}`
                },
                {
                    header: " ⋆⃟ۣۜ᭪🌸➣ MP4",
                    title: "" ,
                    description: `▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.duration}:* ${v.timestamp}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.views}:* ${v.views}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.title}* : ${v.title}\n▢  ⋆⃟ۣۜ᭪🌸➣ *${mssg.aploud}:* ${v.ago}\n`, 
                    id: `${usedPrefix}fgmp4 ${v.url}`
                }
            ]
        });
    }

    await conn.sendListB(m.chat, ' ░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸 ', `\n ♥⃟᮪〭۬̇〬⃟˖ꪶ Resultados de:\n *${text}*`, `OPCIONES`, ytres[0].image, listSections, m);
};

handler.help = ['play2']
handler.tags = ['dl']
handler.command = ['play2', 'playvid2', 'playlist', 'playlista'] 
handler.disabled = false

export default handler
