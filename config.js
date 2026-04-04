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
  'https://api.fgmods.xyz': 'm2XBbNvz' //-- 100 de límite diario --- Regístrese en