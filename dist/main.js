"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const discord_js_1 = require("discord.js");
const bot_1 = require("./app/bot");
let token = '';
if (process.env.TOKEN) {
    token = process.env.TOKEN;
}
else {
    const config = JSON.parse(fs.readFileSync('./token.json').toString());
    token = config.token;
}
const client = new discord_js_1.Client();
const bot = new bot_1.Bot(client);
client.login(token);
//# sourceMappingURL=main.js.map