import * as fs from 'fs';

const config = JSON.parse(fs.readFileSync('./token.json').toString());

import { Client } from 'discord.js';
import { Bot } from './app/bot';

const client = new Client();
const bot = new Bot(client);

client.login(config.token);
