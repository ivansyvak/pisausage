"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const discord_js_1 = require("discord.js");
const app_bot_1 = require("./app/app-bot");
let token = '';
if (process.env.TOKEN) {
    token = process.env.TOKEN;
}
else {
    const config = JSON.parse(fs.readFileSync('./token.json').toString());
    token = config.token;
}
const client = new discord_js_1.Client();
const bot = new app_bot_1.Bot(client);
client.login(token);
process.on('uncaughtException', e => {
    bot.sendLogMessage(`message: ${e.message}. \nstack: ${e.stack}`);
});
process.on('unhandledRejection', reason => {
    bot.sendLogMessage(`Unhandled rejection: ${reason}`);
});
//# sourceMappingURL=main.js.map