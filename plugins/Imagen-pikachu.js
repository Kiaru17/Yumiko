// Definir primero las imágenes
global.pack = [
  "https://telegra.ph/file/5a382d2ee0f08306e9970.jpg",
  "https://telegra.ph/file/ccdcd6a92c4f6b1c11a00.jpg",
  "https://telegra.ph/file/260660a398e0d07360ba6.jpg",
  "https://telegra.ph/file/aba8cbbe1a1c7dc727a19.jpg",
  "https://telegra.ph/file/1fbb857f22b30578ae1b6.jpg",
];

let handler = async (m, { conn, command }) => {
  let url = global.pack[Math.floor(Math.random() * global.pack.length)];
  await conn.sendFile(
    m.chat,
    url,
    "pikachu.jpg",
    `🌸 *PIKACHU ALEATORIO* 🌸`,
    m
  );
};

handler.help = ["pikachu"];
handler.tags = ["internet"];
handler.command = /^(pikachu)$/i;
handler.limit = 3;

export default handler;