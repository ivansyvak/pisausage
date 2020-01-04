import * as fs from 'fs';
import { logger } from './common/logger';

interface Config {
  token: string;
}

let configFilePath = "";
switch (process.env.NODE_ENV) {
  case 'dev':
    configFilePath = './config/config-dev.json';
    break;

  case 'prod':
    configFilePath = './config/config-prod.json';
    break;

  default:
    throw `Incorrect NODE_ENV value ${process.env.NODE_ENV} is not supported`;
}

const baseConfig = JSON.parse(fs.readFileSync('./config/config-base.json').toString());
const envConfig = JSON.parse(fs.readFileSync(configFilePath).toString());

export const CONFIG: Config = {...baseConfig, ...envConfig};
