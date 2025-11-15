//ASWIN SPARKY ✅

const express = require("express");
const app = express();
const pino = require("pino");
const fs = require("fs-extra");
const { encodeText } = require('./lib/function');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const PORT = process.env.PORT || 3000;
const { exec } = require("child_process")
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home/pair.html");
});
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
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Ubuntu", "Chrome", "20.0.04"],
            });
            if (!sparky.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sparky.requestPairingCode(num)
                if (!res.headersSent) {
                    await res.send({ code });
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
                    let encoded = await encodeText(sessionsparky);
                    let session = await sparky.sendMessage(sparky.user.id, { text: 'A-S-W-I-N-S-P-A-R-K-Y:' + encoded });
                    let text = "*Thank You for Using X BOT MD*\n\n\nDeveloper Contact: +91 70129 84396\n\nOfficial Channel: https://whatsapp.com/channel/0029Va9ZOf36rsR1Ym7O2x00\n\nIf you encounter any issues or wish to report a problem, please feel free to join our dedicated support group: https://chat.whatsapp.com/I6lxNWSNneILUeqRqCa36S\n\nWe appreciate your feedback and are here to assist you!";
                    await sparky.sendMessage(sparky.user.id, { text: text }, { quoted: session });
                    await delay(3000);
                    await fs.emptyDirSync(__dirname + '/session');
                    await console.log("_Restarting..._");
                    exec("npm restart", (error, stdout, stderr) => {
                        if (error) {
                            return console.log(`Error: ${error}`);
                        } return;
                    });
                    process.exit(0)
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    sparkyPair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await fs.emptyDirSync(__dirname + '/session');
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await sparkyPair()
});
//
app.listen(PORT, () => console.log("App listened on port", PORT));                
