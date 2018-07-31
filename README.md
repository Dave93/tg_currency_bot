# tg_currency_bot
You can convert from any to any currency using commands


Set your bot token in file index.js
```javascript
const token = 'YOUR_TOKEN_HERE'; //Your Token
```

Add index.js file to [pm2](http://pm2.keymetrics.io/) process using following bash command
```bash
pm2 start index.js --name currency_converter
```
