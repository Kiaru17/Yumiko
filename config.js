import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 
import { en, es, pt, id, ar } from './language/index.js'

global.owner = [
  ['5493625494354', '𝑪𝒓𝒆𝒂𝒅𝒐𝒓𝒂', true],
  ['5493625494354', '𝑪𝒐𝒍𝒂𝒃 ', true],
] //Numeros de owner 

global.mods = [''] 
global.prems = ['5493625494354', '5493625494354']

// Lenguaje del bot (cambiar a 'en', 'pt', 'id', 'ar' según prefieras)
global.mssg = es

global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'm2XBbNvz' //-- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = '░⃟🌸𝑬𝒕𝒖 𝑩𝒐𝒕░⃟🌸' 
global.author = '_.k.i.a.r.u._17' 
global.descripcion = '𝐒𝐨𝐥𝐨 𝐩𝐫𝐞𝐠𝐮𝐧𝐭𝐚𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭'

//--info FG
global.botName = '░⃟🌸𝑬𝒓𝒖 𝑩𝒐𝒕░⃟🌸'
global.fgig = '𝐒𝐨𝐥𝐨 𝐩𝐫𝐞𝐠𝐮𝐧𝐭𝐚𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭' 
global.fgigt = 'https://instagram.com/_.k.i.a.r.u._17' 
global.fgsc = 'https://github.com/Maxz-on/Yumiko-.git' 
global.fgyt = ''
global.fgpyp = ''
global.fglog = '' 

//--- Grupos WA
global.id_canal = '120363302454592275@newsletter' //-ID de canal de WhatsApp
global.fgcanal = 'https://whatsapp.com/channel/0029VafBXQtDDmFbtwvkt20J'
global.bgp = 'https://chat.whatsapp.com/LcFTUnvu0Tw1tCnA2ybdR6'
global.bgp2 = 'https://chat.whatsapp.com/EVl0wxlCww74HV3vvZq83a'
global.bgp3 = 'https://chat.whatsapp.com/Fn5Ipyxu6mE6qEQlwWZTwU' //--GP NSFW

// Variables de respuesta (que faltaban)
global.fwc = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "status@broadcast" }, message: { contactMessage: { displayName: global.botName, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${global.author};;;\nFN:${global.author}\nEND:VCARD` } } }
global.rpl = { quoted: null }
global.rcanal = { quoted: null }

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************

global.wait = '🌸 𝐂𝐚𝐫𝐠𝐚𝐧𝐝𝐨....'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})