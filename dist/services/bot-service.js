"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const discord_js_1 = require("discord.js");
const uid = require("uniqid");
const user_service_1 = require("./user-service");
const phrase_service_1 = require("./phrase-service");
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
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.author.bot) {
                return;
            }
            if (msg.channel instanceof discord_js_1.DMChannel) {
                this.handleDMC(msg);
                return;
            }
            let words = msg.content.split(' ');
            for (let word of words) {
                let phrases = yield phrase_service_1.phraseService.read(word);
                if (!phrases) {
                    continue;
                }
                let phrasesArr = Object.values(phrases);
                let rand = phrasesArr[Math.floor(Math.random() * phrasesArr.length)];
                msg.reply(rand.content);
            }
        });
    }
    handleDMC(msg) {
        if (msg.content.includes('!login')) {
            this.startRegistration(msg);
            return;
        }
    }
    startRegistration(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_service_1.userService.readOne(msg.author.id);
            if (user) {
                msg.author.send(`You are already logged in with code: ${user.tmpKey}`);
                return;
            }
            let expiringDate = new Date();
            expiringDate.setHours(expiringDate.getHours() + (24 * 60));
            let tmpKey = uid(8);
            this.tmpKeys[tmpKey] = {
                expiring: expiringDate,
                key: tmpKey,
                payload: msg.author.id
            };
            msg.author.send(`${tmpKey}`);
        });
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
    removeTmpKey(tmpKey) {
        delete this.tmpKeys[tmpKey];
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