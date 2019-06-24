const token = "NTkyNzI0ODU3NDk0NDM3ODky.XRDm2Q.DzSmykBzj2IkaZUlM2mdvqmweDU";

import { Client } from 'discord.js';
import { Bot } from './app/bot';

const client = new Client();
const bot = new Bot(client);

client.login(token);
