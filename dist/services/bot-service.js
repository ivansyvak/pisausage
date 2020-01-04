"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const discord_js_1 = require("discord.js");
const uid = require("uniqid");
class BotService {
    constructor() {
        this.tmpKeys = {};
        this.version = "0.0.1";
        this.client = new discord_js_1.Client();
        this.client.on('ready', this.onReady.bind(this));
        this.client.on('message', this.onMessage.bind(this));
        this.client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
    }
    start() {
        this.client.login(config_1.CONFIG.token);
        setInterval(this.checkTmpData.bind(this), 24 * 60 * 60 * 1000);
    }
    onReady() {
    }
    onMessage(msg) {
        if (msg.channel instanceof discord_js_1.DMChannel) {
            this.handleDMC(msg);
            return;
        }
    }
    handleDMC(msg) {
        if (msg.content.includes('!login')) {
            this.startRegistration(msg);
            return;
        }
    }
    startRegistration(msg) {
        let expiringDate = new Date();
        expiringDate.setHours(expiringDate.getHours() + 24);
        let tmpKey = uid(8);
        this.tmpKeys[tmpKey] = {
            expiring: expiringDate,
            key: tmpKey,
            payload: msg.author.id
        };
        msg.author.send(`Код активации: ${tmpKey}`);
    }
    onGuildMemberAdd(member) {
        this.generalChannel.send(`Привет, <@${member.user.id}>! Меня зовут Писосыч, но пока что я нихуя не умею`);
    }
    getUsers() {
        return this.client.users
            .filter(user => !user.bot)
            .array();
    }
    getUser(id) {
        return this.client.users.get(id);
    }
    getTmpKey(tmpKey) {
        return this.tmpKeys[tmpKey];
    }
    sendMessage(id, message) {
        let user = this.client.users.get(id);
        if (user) {
            user.sendMessage(message);
        }
    }
    checkTmpData() {
        let curDate = new Date();
        let toRemove = [];
        for (let key in this.tmpKeys) {
            let tmpKey = this.tmpKeys[key];
            if (tmpKey.expiring < curDate) {
                toRemove.push(key);
            }
        }
        toRemove.forEach(key => (delete this.tmpKeys[key]));
    }
}
exports.BotService = BotService;
exports.botService = new BotService();
//# sourceMappingURL=bot-service.js.map