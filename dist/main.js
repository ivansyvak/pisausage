"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./token.json').toString());
const discord_js_1 = require("discord.js");
const bot_1 = require("./app/bot");
const client = new discord_js_1.Client();
const bot = new bot_1.Bot(client);
client.login(config.token);
//# sourceMappingURL=main.js.map