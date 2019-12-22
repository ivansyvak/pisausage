import * as fs from 'fs';


import { Client } from 'discord.js';
import { Bot } from './app/bot';

let token = '';
if (process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  const config = JSON.parse(fs.readFileSync('./token.json').toString());
  token = config.token;
}



const client = new Client();
const bot = new Bot(client);

client.login(token);

process.on('uncaughtException', e => {
  bot.sendLogMessage(`message: ${e.message}. \nstack: ${e.stack}`);
});

process.on('unhandledRejection', reason => {
  bot.sendLogMessage(`Unhandled rejection: ${reason}`);
});
