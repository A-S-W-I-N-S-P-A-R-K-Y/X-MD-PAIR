## X BOT MD WEB PAIR SESSION 

---
### You can use this function for connecting with your bot MakeSession Function

The `MakeSession` function is used to restore `creds.json` file 

### Function 

```javascript
const axios = require('axios');
let cc = config.SESSION_ID.split(':')[1];

async function MakeSession(){
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if(cc.length<30){
        let { data } = await axios.get('https://aswin-sparky-pastebin.onrender.com/raw/'+cc)
    await fs.writeFileSync(__dirname + '/session/creds.json', atob(data), "utf8")    
    } else {
	 var c = atob(cc)
         await fs.writeFileSync(__dirname + '/session/creds.json', c, "utf8")    
    }
}
}
MakeSession()

```
