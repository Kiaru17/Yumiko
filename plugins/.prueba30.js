let toM = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id)
  
  // Función para obtener elemento aleatorio de un array
  let getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]
  
  let a = getRandom(ps)
  let b
  
  do {
    b = getRandom(ps)
  } while (b === a)
  
  m.reply(`*🌸 Vamos a hacer algunas amistades 🌸*\n\n*Oye ${toM(a)} hablale al privado a ${toM(b)} para que jueguen y se haga una amistad 🙆*\n\n*Las mejores amistades empiezan con un juego* 🎮`, null, {
    mentions: [a, b]
  })
}

handler.help = ['amistad']
handler.tags = ['main', 'fun']
handler.command = ['amigorandom', 'amistad']
handler.group = true
handler.register = true

export default handler