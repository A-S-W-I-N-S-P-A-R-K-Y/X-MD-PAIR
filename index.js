//_____qr code session__
//___c DiegosonTech__
//c Aztec-MD Chat Bot___

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const fs = require("fs-extra");
const crypto = require("crypto");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const PORT = process.env.PORT || 3000;
const axios = require("axios");

const makeid = (length = 10) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

if (fs.existsSync('./auth_info_baileys')) {
  fs.emptyDirSync(__dirname + '/auth_info_baileys');
}

function genMESSAGE(user) {
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
//

if (fs.existsSync('./session')) {
   fs.emptyDirSync(__dirname + '/session');
};
console.log("folder cleaned");

app.get('/pairing', async (req, res) => {
    let num = req.query.number;
        async function sparkyPair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let sparky = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!sparky.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await sparky.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            sparky.ev.on('creds.update', saveCreds)
            sparky.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionsparky = fs.readFileSync('./session/creds.json');
                   // const audiosparky = fs.readFileSync('./kongga.mp3');
                    sparky.groupAcceptInvite("KMqXtMicl9uCgMuduidlXb");
                    const output = await axios.post('http://paste.c-net.org/',`${sessionsparky}`, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
            //
            let c = output.data.split('/')[3];
            await delay(1000) 
            let session_id  = await sparky.sendMessage(sparky.user.id, { 
               text: 'X-BOT-MD:'+c.trim()
            })
            //session quarted sender 
            let cc = `*⚠️ Don't Share The SESSION-ID ☝🏻 Shown Above*.\n\n*Web :* *https://x-md-qr-elctro-wizard.koyeb.app*\n\n\n*BY TEAM EX-BOT-Z 🗿*`;
            await sparky.sendMessage(sparky.user.id, { text: cc }, { quoted: session_id });
				// const sparkyses = await sparky.sendMessage(sparky.user.id, { document: sessionsparky, mimetype: `application/json`, fileName: `creds.json` });
				/*
			sparky.sendMessage(sparky.user.id, {
                    audio: audiosparky,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, {
                    quoted: session_id
                });
		*/
				await sparky.sendMessage(sparky.user.id, { text: `_*Thanks for choosing X-BOT-MD*_

*REPO*
https://github.com/A-S-W-I-N-S-P-A-R-K-Y/X-BOT-MD
            
            
*ᴊᴏɪɴ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ғᴏʀ ᴍᴏʀᴇ ϙᴜᴇʀʏ*
https://chat.whatsapp.com/KMqXtMicl9uCgMuduidlXb
            
*Cʜᴀɴɴᴇʟ ʟɪɴᴋ*
https://whatsapp.com/channel/0029Va9ZOf36rsR1Ym7O2x00
            
            
*Replit Deployment Tutorial Link:*
https://youtu.be/SfXJuSug4Lo?si=aRToYKZFZFzan0a0
            
*Heroku Deployment link:*
            
            
*©ASWIN SPARKY*` }, {quoted: session_id});
        await delay(100);
        return await fs.emptyDirSync(__dirname + '/session');
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    sparkyPair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await fs.emptyDirSync(__dirname + '/session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await sparkyPair()
});
//



app.use("/", (req, res) => {
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function VORTERX() {
    try {
      let tempId = makeid();
      let name = `/auth_info_baileys/`
      const { state, saveCreds } = await useMultiFileAuthState(__dirname + name)
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
                let SCAN = Buffer.from(data).toString('base64');
                await session.sendMessage(user, { text: SCAN });
                await delay(500);

                let session_id1 = await session.sendMessage(user, { text: SCAN });
              } catch (e) {
                console.log(e)
              }

              let cc = genMESSAGE(user);
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

  VORTERX?.().catch(error => {
    console.error("VORTERX:", error);
  });
});

app.listen(PORT, () => console.log("App listened on port", PORT));                
