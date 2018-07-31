const TelegramBot = require('node-telegram-bot-api');
const accounting = require('accounting');
const axios = require('axios');
const server = require('./server');

// replace the value below with the Telegram token you receive from @BotFather
const token = '486528387:AAGBvPOT1sEdou6sOFvGAaEi17e2NZZQA2M';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


//bot.onText(/\/([a-z]+)_([a-z]+) (.+)/, async (msg, match) => {
//  const resp = match[3]; // the captured "whatever"
//  console.log(match);
//  const currency = await axios(`https://free.currencyconverterapi.com/api/v3/convert?q=${match[1].toUpperCase()}_${match[2].toUpperCase()}&compact=y`);
//  const currencyVal = currency.data[`${match[1].toUpperCase()}_${match[2].toUpperCase()}`].val;
//  const result = Math.round(parseInt(resp) * currencyVal);
//
//  bot.sendMessage(msg.chat.id, `${accounting.formatNumber(result, 0, " ")} ${match[2].toUpperCase()}`);
//});
  
bot.onText(/\/([a-z]+)_([a-z]+)/, async (msg, match) => {
  let resp = ''; // the captured "whatever"
  console.log(match);
  if (match[0] == msg.text) {
	  resp = 1;
  } else {
	  resp = msg.text.replace(`${match[0]} `, '');
  }
  const currency = await axios(`https://free.currencyconverterapi.com/api/v3/convert?q=${match[1].toUpperCase()}_${match[2].toUpperCase()}&compact=y`);
  const currencyVal = currency.data[`${match[1].toUpperCase()}_${match[2].toUpperCase()}`].val;
  const result = Math.round(parseInt(resp) * currencyVal);

  bot.sendMessage(msg.chat.id, `${accounting.formatNumber(result, 0, " ")} ${match[2].toUpperCase()}`);
});

bot.onText(/\/start/, async (msg, match) => {
  const first_name = msg.from.first_name;
  const last_name = msg.from.last_name;
  const username = msg.from.username;
  const id = msg.from.id;
  await server.users.findOrCreate({ where: {userId: id}, defaults: {userId: id, first_name, last_name, username} });
  await bot.sendMessage(id, 'Здравствуйте, ' + (last_name ? last_name : '') + ' ' + first_name);
  await bot.sendMessage(id, '/uzs_usd введите сумму\n /usd_uzs введите сумму\n /rub_usd введите сумму');
  // count members
  const countUsers = await server.users.count();
  if (countUsers % 100 == 0) {
    await bot.sendMessage(id, `Нас стало ${countUsers}`);
  }
});

//bot.on('message', async (msg, match) => {
//  if (msg.text !== '/start'){
//    const id = msg.from.id;
//    const textToSend = msg.text;
//    console.log(msg);
//    const admin =  await server.users.findOne({ where: {isAdmin: 1} });
//
//    if (admin.userId === msg.from.id) {
//      const all = await server.users.findAll();
//      all.forEach(async (name, i) => {
//        await bot.sendMessage(name.userId, textToSend);
//      });
//    }
//}
//});
