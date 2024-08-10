
import yts from 'yt-search'
let handler = async (m, { conn, command, text, usedPrefix }) => {
	
  if (!text) throw `${mssg.avisoGene4}\n\n*INGRESA EL NOMBRE*\n_Ejemplo: ${usedPrefix + command} 30 grados hace calor_`
	let res = await yts(text)
	let vid = res.videos[0]
	if (!vid) throw `🌸 Vídeo/Audio no encontrado 🌸`
	let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
	//const url = 'https://www.youtube.com/watch?v=' + videoId
	m.react('🫦') 
  let play = `
> ♥⃟᮪〭۬̇〬⃟˖ꪶ *TÍTULO:* ${vid.title}
> ♥⃟᮪〭۬̇〬⃟˖ꪶ *DURACIÓN:* ${vid.timestamp}
> ♥⃟᮪〭۬̇〬⃟˖ꪶ *VISTAS:* ${vid.views.toLocaleString()}`
 await conn.sendButton(m.chat, play, mssg.ig, thumbnail, [
    ['✧͢⃟ᤢ🌸 𝗠𝗨𝗦𝗜𝗖𝗔 ✧͢⃟ᤢ🌸', `${usedPrefix}fgmp3 ${url}`],
    ['✧͢⃟ᤢ🌸 𝗩𝗜𝗗𝗘𝗢 ✧͢⃟ᤢ🌸', `${usedPrefix}fgmp4 ${url}`],
['✧͢⃟ᤢ🌸 𝗠𝗘𝗡𝗨 ✧͢⃟ᤢ🌸', `${usedPrefix}allmenu`]
  ], null, [['✧͢⃟ᤢ🌸 𝗖𝗔𝗡𝗔𝗟 ✧͢⃟ᤢ🌸', `${fgcanal}`]], m)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']
handler.disabled = false

export default handler
