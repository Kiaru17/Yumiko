
import fg from 'api-dylux';
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
if (!args[0]) throw '░⃟🌸𝐃𝐄𝐀𝚻𝐇 𝐍𝐎𝚻𝐄 𝐁𝐎𝐓░⃟🌸\n\n*INGRESA EL ENLACE*\n_.fb <link>_';
  m.react(rwait);

  try {
    let result = await fg.fbdl(args[0]);
    let tex = `
♥⃟᮪〭۬̇〬⃟˖ꪶ 𝗢𝗕𝗝𝗘𝗧𝗢 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ♥⃟᮪〭۬̇〬⃟˖ꪶ`;
    conn.sendFile(m.chat, result.videoUrl, 'fb.mp4', tex, m);
    m.react(done);
  } catch (error) {
    m.reply(mssg.error)
  }
};
handler.help = ['facebook'].map(v => v + ' <url>');
handler.tags = ['dl'];
handler.command = /^((facebook|fb)(downloder|dl)?)$/i;
handler.diamond = true;

export default handler;

