
import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`;
    m.react('📀');

    let result = await yts(text);
    let ytres = result.videos;


    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `LISTAS DE MENUS GENESIS`,
            rows: [
                {
                    header: 'Menu Completo',
                    title: "",
                    description: `Para ver todos los comandos\n`, 
                    id: `.allmenu`
                },
                {
                    header: "📀 MP4",
                    title: "" ,
                    description: `▢ ⌚ *${mssg.duration}:* ${v.timestamp}\n▢ 👀 *${mssg.views}:* ${v.views}\n▢ 📌 *${mssg.title}* : ${v.title}\n▢ 📆 *${mssg.aploud}:* ${v.ago}\n`, 
                    id: `${usedPrefix}fgmp4 ${v.url}`
                }
            ]
        });
    }

    await conn.sendList(m.chat, '👋🏻 Hola¡! Bienvenido A Mi Sub Menú\n\n*Creador:* Daniel\n*Versión:* 1.0.0\n\n💮 si hay algún error puedes contactarme, usa el comando: #owner\n\nGracias¡! 🔴', `\n 📀 Resultados de:\n *${text}*`, `OPCIONES`, ytres[0].image, listSections, m);
};

handler.help = ['main']
handler.tags = ['help']
handler.command = ['menu', 'help'] 
handler.disabled = false

export default handler