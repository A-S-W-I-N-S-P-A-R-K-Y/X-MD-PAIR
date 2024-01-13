//_____qr code session__
//___c DiegosonTech__
//c Aztec-MD Chat Bot___

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const fs = require("fs-extra");
const crypto = require("crypto");
const { makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore } = require("@whiskeysockets/baileys");

let PORT = process.env.PORT || 3000;

const makeid = (length = 10) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

if (fs.existsSync('./auth_info_baileys')) {
  fs.emptyDirSync(__dirname + '/auth_info_baileys');
}

function generateCustomMessage(user) {
  return `┌───⭓『
❒ *[AMAZING YOU CHOOSE AZTEC]*
❒ _NOW ITS TIME TO RUN IT_
└────────────⭓
┌───⭓
❒  • Chat with owner •
❒ *GitHub:* __https://github.com/Vorterx_
❒ *Author:* _wa.me/27686881509_
└────────────⭓
`;
}

app.use("/", (req, res) => {
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function VORTERX() {
    let tempId = makeid();
    let name = `/auth_info_baileys/`
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + name)
    try {
      let session = makeWASocket({
        printQRInTerminal: false,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "silent" }),
        browser: [Browsers.Chrome, 'Windows 10', 'Chrome/89.0.4389.82'],
        auth: state
      });

      session.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;

        switch (connection) {
          case "open":
            if (qr) {
              res.end(await toBuffer(qr));
            } else {
              await delay(500 * 10);
              let user = session.user.id;

              try {
                let data = fs.readFileSync(__dirname + name + 'creds.json');
                let Scan_ld = Buffer.from(data).toString('base64');
                await session.sendMessage(user, { text: Scan_ld });
                await delay(500);

                let session_id1 = await session.sendMessage(user, { text: Scan_ld });
              } catch (e) {
                console.log(e)
              }

              let cc = generateCustomMessage(user);

              let session_id = await session.sendMessage(user, { document: { url: __dirname + name + 'creds.json' }, fileName: "creds.json", mimetype: "application/json" });

              await session.sendMessage(user, { text: cc }, { quoted: session_id });

              process.send("reset");
            }
            break;

          case "close":
            if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
              VORTERX();
            }
            break;

          default:
            console.log("Unknown connection state");
            break;
        }
      });
    } catch (err) {
      console.log(
        err + "Unknown Error Occurred. Please report to Owner and Stay tuned"
      );
    }
  }

  VORTERX();
});

app.listen(PORT, () => console.log("App listened on port", PORT));
              
