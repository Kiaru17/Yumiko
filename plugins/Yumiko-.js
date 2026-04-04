let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
  if (!args[0]) throw `🌸 *Ingrese un texto para iniciar la encuesta.* 🌸\n\n🌸 *Ejemplo* 🌸: \n*${usedPrefix + command}* opción1|opción2|opción3`
  
  if (!text.includes('|')) throw `🌸 Separe las opciones con *|* 🌸\n\n🌸 *Ejemplo* 🌸: \n*${usedPrefix + command}* opción1|opción2|opción3`
  
  let opciones = []
  let items = text.split('|')
  
  for (let i = 0; i < items.length; i++) {
    opciones.push([items[i].trim()])
  }
  
  await conn.sendPoll(m.chat, `${global.packname}`, opciones, m)
}

handler.help = ['encuesta <text|text2>']
handler.tags = ['grupo'] 
handler.command = ['poll', 'encuesta'] 
handler.group = true

export default handler