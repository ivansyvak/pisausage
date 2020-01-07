"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
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
exports.CONFIG = Object.assign({}, baseConfig, envConfig);
//# sourceMappingURL=config.js.map