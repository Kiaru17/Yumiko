import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) return conn.reply(m.chat, `*• Ingresa un enlace Spotify*`, m)
  let user = global.db.data.users[m.sender]
  await m.react('🕓')
  try {
    let response = await axios.get(`https://api.cafirexos.com/api/spotifyinfo?url=${args[0]}`)
    let { title, artist, album, year, thumbnail, url } = response.data.spty.resultado
    let downloadLink = response.data.spty.download.audio
    let img = await (await fetch(thumbnail)).buffer()

    let txt = `* S P O T I F Y  -  D O W N L O A D*\n\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Titulo* : ${title}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Artista* : ${artist}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Album* : ${album}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Fecha de lanzamiento ∙* ${year}\n\n`
        txt += `*- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, downloadLink, title + '.mp3', `
    `.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
let response = await axios.get(`https://api.botcahx.eu.org/api/download/spotify?url=${args[0]}&apikey=${botcahx}`)
    let { title, artist, thumbnail, url, duration, preview } = response.data.result.data
    let downloadLink = response.data.result.data.url
    let img = await (await fetch(thumbnail)).buffer()

    let txt = `* S P O T I F Y  -  D O W N L O A D*\n\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Titulo* : ${title}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Artista* : ${artist}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Duración* : ${duration}\n\n`
        txt += `*- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, downloadLink, title + '.mp3', `
    `.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
    let response = await axios.get(`https://www.guruapi.tech/api/spotifyinfo?text=${args[0]}`)
    let { title, artist, album, year, thumbnail, url } = response.data.spty.results
    let downloadLink = response.data.spty.download.audio
    let img = await (await fetch(thumbnail)).buffer()

    let txt = `* S P O T I F Y  -  D O W N L O A D*\n\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Titulo* : ${title}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Artista* : ${artist}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Album* : ${album}\n`
        txt += `         ⋆⃟ۣۜ᭪🌸➣   *Fecha de lanzamiento ∙* ${year}\n\n`
        txt += `*- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`

await await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, downloadLink, title + '.mp3', `
    `.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}
handler.tags = ['downloader']
handler.help = ['spotifydl *<url spotify>*']
handler.command = ['spotifydl']
//handler.limit = 1
handler.register = true
export default handler