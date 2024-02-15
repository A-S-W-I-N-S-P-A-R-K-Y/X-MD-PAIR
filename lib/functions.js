const fs = require("fs");
const path = require("path");
const ff = require("fluent-ffmpeg");

async function getBuffer(url, options) {
    try {
        options ? options: {};
        const res = await require("axios")({
            method: "get",
            url,
            headers: {
                DNT: 1,
                "Upgrade-Insecure-Request": 1,
            },
            ...options,
            responseType: "arraybuffer",
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
}

async function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, "./tmp", +new Date() + "." + ext);
      let out = tmp + "." + ext2;
      await fs.promises.writeFile(tmp, buffer);
      spawn("ffmpeg", ["-y", "-i", tmp, ...args, out])
        .on("error", reject)
        .on("close", async (code) => {
          try {
            await fs.promises.unlink(tmp);
            if (code !== 0) return reject(code);
            resolve(await fs.promises.readFile(out));
            await fs.promises.unlink(out);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

async function toAudio(buffer, ext) {
  return ffmpeg(
    buffer,
    ["-vn", "-ac", "2", "-b:a", "128k", "-ar", "44100", "-f", "mp3"],
    ext,
    "mp3"
  );
}

module.exports = {
toAudio,
getBuffer,
}
