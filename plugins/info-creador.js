import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('⭐')
  
  let fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;Bot\nFN:Yumiko Bot\nTEL;type=CELL;type=WHATSAPP;waid=5493625494354:+5493625494354\nEND:VCARD` 
      } 
    } 
  }
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = await