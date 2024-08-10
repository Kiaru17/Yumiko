import axios from "axios"
let handler = async (m, {command, conn, usedPrefix}) => {
        m.react('✅')
let res = (await axios.get(`https://raw.githubusercontent.com/MultiBot-OFC/ExoticoBot-MD/master/NODE_EXOTICO_JSON/node-exotico-anime-boy/hot-${command}.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw `✧͢⃟ᤢ🌸 𝙇𝙤𝙨 𝙘𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙥𝙖𝙧𝙖 𝙖𝙙𝙪𝙡𝙩𝙤𝙨 𝙚𝙨𝙩𝙖𝙣 𝙙𝙚𝙨𝙖𝙘𝙩𝙞𝙫𝙖𝙙𝙤𝙨, 𝙪𝙨𝙚 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 ✧͢⃟ᤢ🌸: #on modohorny.` 
conn.sendButton(m.chat, `♥⃟᮪〭۬̇〬⃟˖ꪶ _${command}_ ♥⃟᮪〭۬̇〬⃟˖ꪶ`.trim(), packname, haha, [['✧͢⃟ᤢ🌸 𝙎𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 ✧͢⃟ᤢ🌸', `${usedPrefix + command}`]], null, null, m)    
}
handler.command = handler.help = ['takeda', 'asuma', 'endeavor']
handler.tags = ['nsfw']
export default handler