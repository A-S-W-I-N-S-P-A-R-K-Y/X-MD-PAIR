const axios = require("axios");
const FormData = require("form-data");

async function encodeText(content, filename = "") {
const formData = new FormData();

  formData.append("content", content);
  formData.append("filename", filename);
  formData.append("language", "json");

  try {
    const res = await axios.post(
      "https://aswin-sparky-pastebin.onrender.com/api/paste",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: "*/*",
        },
      }
    );

    console.log("✅ Uploaded successfully!");
    console.log("Slug:", res.data.slug);
    return res.data.slug;
  } catch (err) {
    console.error("❌ Upload failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {encodeText};