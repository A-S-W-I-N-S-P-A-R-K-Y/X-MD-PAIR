## X BOT MD WEB PAIR SESSION 

---

> **Web-based Pairing Service for X-BOT-MD**  
> *Link your WhatsApp account to X-BOT-MD using an 8-character pairing code — no QR scanning required!*

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-blue?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/WhatsApp-Baileys-25D366?style=for-the-badge&logo=whatsapp" alt="WhatsApp">
  <img src="https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker" alt="Docker">
</p>

---

### You can use this function for connecting with your bot MakeSession Function

The `MakeSession` function is used to restore `creds.json` file 

### Function 

```javascript
const axios = require('axios');

async function MakeSession(){
if (!fs.existsSync(__dirname + '/session/creds.json')) {
        let { data } = await axios.get(`http://localhost:3000/session?id=`+ your_session);
        await fs.writeFileSync(__dirname + '/session/creds.json', data.data, "utf8");
}
}
MakeSession()

```

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#-configuration)
- [📁 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [👥 User Flow](#-user-flow)
- [🤖 Bot Integration: MakeSession()](#-bot-integration-makesession)
- [🐳 Docker Deployment](#-docker-deployment)
- [🔐 Security Considerations](#-security-considerations)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits](#-credits)

---

## ✨ Features

- 🔐 **Pairing Code Authentication**: Generate 8-character codes instead of scanning QR codes
- 🌐 **Responsive Web UI**: Modern, animated frontend with country code selector
- 💾 **MongoDB Session Storage**: Securely store WhatsApp credentials with unique Session IDs
- 🔄 **Auto-Restart on Auth**: Server restarts after successful pairing for clean state
- 📱 **WhatsApp Confirmation**: Users receive their Session ID directly via WhatsApp message
- 🐳 **Docker Ready**: One-command containerized deployment
- 🎨 **Futuristic Design**: Cyan/dark theme with animated canvas background

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 18+ |
| **Backend** | Express.js |
| **WhatsApp API** | `@whiskeysockets/baileys` |
| **Database** | MongoDB + Mongoose |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Process Mgmt** | PM2 |
| **Containerization** | Docker |
| **Env Management** | dotenv |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB instance (local or Atlas)
- WhatsApp account for testing

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/A-S-W-I-N-S-P-A-R-K-Y/X-MD-PAIR
cd X-MD-PAIR

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI

# 4. Start the server (development)
node index.js

# 5. Start the server (production with PM2)
npm start