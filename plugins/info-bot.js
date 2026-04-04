import fs from 'fs';

const handler = (m) => m;

handler.all = async function(m) {
  const chat = global.db.data.chats[m.chat];
  
  // Responder a "bot"
  if (/^bot$/i.test(m.text) && !chat.isBanned) {
    global.conn.sendPresenceUpdate('recording', m.chat);
    await m.reply(`𝐇𝐨𝐥𝐚 𝐯𝐯🫦 ¿Cómo estás?`);
  }
  
  // Responder a "cómo estás"
  if (/^(cómo estás|como estas|hola bot)$/i.test(m.text) && !chat.isBanned) {
    global.conn.sendPresenceUpdate('recording', m.chat);
    await m.reply(`¡Bien y vos! 😊`);
  }
  
  return !0;
};

export default handler;