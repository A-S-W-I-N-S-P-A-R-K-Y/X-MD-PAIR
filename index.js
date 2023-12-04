/
//_____qr code session__
//___c DiegosonTech__
//c Aztec-MD Chat Bot___

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const fs = require("fs-extra");
const { makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore } = require("@whiskeysockets/baileys");
const { base32 } = require("rfc4648");

let PORT = process.env.PORT || 3000;

const makeid = (num = 10) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

          let session_id1 = await session.sendMessage(user, { text: `_VORTERX_${tempId}_VORTERX_` });

          let data = fs.readFileSync(__dirname + name + "creds.json");
          let base32Data = base32.stringify(data);
          let session_id = await session.sendMessage(user, { document: { url: `data:application/octet-stream;base32,${base32Data}` }, fileName: "creds.json", mimetype: "application/octet-stream" });

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
