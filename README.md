## X BOT MD WEB PAIR SESSION 

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
