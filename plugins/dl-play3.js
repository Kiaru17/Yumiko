
import yts from 'yt-search'
let handler = async (m, { conn, command, text, usedPrefix }) => {

  if (!text) throw `${mssg.avisoGene4}\n\n*INGRESA EL NOMBRE*\n_Ejemplo: ${usedPrefix + command} Mamita Rica_`
        let res = await yts(text)
        let vid = res.videos[0]
        if (!vid) throw `🌸 Vídeo/Audio no encontrado 🌸`
        let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
        //const url = 'https://www.youtube.com/watch?v=' + videoId
        m.react('🔈') 
  let play = `
* ⋆⃟ۣۜ᭪🌸➣ 𝗧𝗶𝘁𝘂𝗹𝗼 »* ${vid.title}
* ⋆⃟ۣۜ᭪🌸➣ 𝗖𝗿𝗲𝗮𝗱𝗼 »* ${vid.ago}
* ⋆⃟ۣۜ᭪🌸➣ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻 »* ${vid.timestamp}
* ⋆⃟ۣۜ᭪🌸➣ 𝗩𝗶𝘀𝗶𝘁𝗮𝘀 »* ${vid.views.toLocaleString()}`
 await conn.sendButton(m.chat, play, mssg.ig, thumbnail, [
    ['✧͢⃟ᤢ🌸 𝗠𝗣𝟯 𝗗𝗢𝗖 ✧͢⃟ᤢ🌸', `${usedPrefix}ytmp3doc ${url}`],
    ['✧͢⃟ᤢ🌸 𝗠𝗣𝟰 𝗗𝗢𝗖 ✧͢⃟ᤢ🌸', `${usedPrefix}ytmp4doc ${url}`],
    ['✧͢⃟ᤢ🌸 𝗠𝗘𝗡𝗨 ✧͢⃟ᤢ🌸', `${usedPrefix}allmenu`]
  ], null, [['✧͢⃟ᤢ🌸 𝗖𝗔𝗡𝗔𝗟 ✧͢⃟ᤢ🌸', `${fgcanal}`]], m)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play3', 'playdoc']
handler.disabled = false

export default handler