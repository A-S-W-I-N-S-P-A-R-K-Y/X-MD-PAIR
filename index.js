//_____qr code session__
//___c DiegosonTech__
//c Aztec-MD Chat Bot___

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const axios = require("axios");
const qrcode = require("qrcode-terminal");
const PastebinAPI = require("pastebin-js");
const fs = require("fs-extra");
const {makeWASocket,useMultiFileAuthState,Browsers,delay,makeInMemoryStore,} = require("@whiskeysockets/baileys");

let PORT = process.env.PORT || 3000;
const pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL"); //new api

const makeid = (num = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var characters9 = characters.length;
  for (var i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters9));
  }
  return result;
}




if (fs.existsSync('./auth_info_baileys')) {
  fs.emptyDirSync(__dirname + '/auth_info_baileys');
};

app.use("/", (req, res) => {
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function Vorterx() {
    let tempId = makeid();
    let name = `/auth_info_baileys/`
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + name)
    try {
      let session = makeWASocket({
        printQRInTerminal: false,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "silent" }),
        browser: Browsers.macOS("Desktop"),
        auth: state
      });

      session.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;
        if (qr) { res.end(await toBuffer(qr)); }

        if (connection == "open") {
          await delay(500 * 10);
          let user = session.user.id;
          let c2 = '';

          try {
            let data = fs.readFileSync(__dirname + name + 'creds.json');
            let b64data = Buffer.from(data).toString('base64');
            const output = await axios.post('http://paste.c-net.org/', b64data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            c2 = output.data.split('/')[3];
            await delay(500);
            let session_id1 = await session.sendMessage(user, { text: 'Vorterx;;;' + c2 });
          } catch (e) {
            console.log(e)
          }
          let cc = `┌───⭓『
❒ *[AMAZING YOU CHOOSE AZTEC]*
❒ _NOW ITS TIME TO RUN IT_
└────────────⭓
┌───⭓
❒  • Chat with owner •
❒ *GitHub:* __https://github.com/Vorterx_
❒ *Author:* _wa.me/27686881509_
└────────────⭓
`;

          let session_id = await session.sendMessage(user, { document: { url: __dirname + name + 'creds.json' }, fileName: "session.json", mimetype: "application/json", });

          await session.sendMessage(user, { text: cc }, { quoted: session_id });

          process.send("reset");
        }
        session.ev.on('creds.update', saveCreds);
        if (
          connection === "close" &&
          lastDisconnect &&
          lastDisconnect.error &&
          lastDisconnect.error.output.statusCode != 401
        ) {
          Vorterx();
        }
      });
    } catch (err) {
      console.log(
        err + "Unknown Error Occured Please report to Owner and Stay tuned"
      );
    }
  }

  Vorterx();
});

app.listen(PORT, () => console.log("App listened on port", PORT));
