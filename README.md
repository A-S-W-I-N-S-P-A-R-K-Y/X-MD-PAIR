## X BOT MD WEB PAIR SESSION 

---
### You can use this function for connecting with your bot MakeSession Function

The `MakeSession` function is used to restore `creds.json` file 

### Function 

```javascript
const axios = require('axios');
let cc = config.SESSION_ID.replace(/X-BOT-MD:/g, "");

async function MakeSession(){
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if(cc.length<30){
        let { data } = await axios.get('https://paste.c-net.org/'+cc)
    await fs.writeFileSync(__dirname + '/auth_info_baileys/creds.json', atob(data), "utf8")    
    } else {
	 var c = atob(cc)
         await fs.writeFileSync(__dirname + '/auth_info_baileys/creds.json', c, "utf8")    
    }
}
}
MakeSession()

```
