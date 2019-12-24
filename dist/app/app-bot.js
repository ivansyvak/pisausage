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
const mention_manager_1 = require("./messages/mentions/mention-manager");
const logger_1 = require("./logger");
const reaction_manager_1 = require("./messages/reactions/reaction-manager");
const command_manager_1 = require("./messages/commands/command-manager");
class AppBot {
    constructor(client) {
        this.client = client;
        this.mentionManager = new mention_manager_1.MentionManager();
        this.reactionManager = new reaction_manager_1.ReactionManager();
        this.commandManager = new command_manager_1.CommandManager();
        client.on('ready', this.onReady.bind(this));
        client.on('message', this.onMessage.bind(this));
        client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.login(config_1.CONFIG.token);
        });
    }
    onReady() {
        this.client.channels.forEach(chanenl => {
            if (!(chanenl instanceof discord_js_1.TextChannel)) {
                return;
            }
            switch (chanenl.name) {
                case 'general':
                case 'основная-нора':
                    this.generalChannel = chanenl;
                    break;
                case 'quotes':
                    this.quoteslChannel = chanenl;
                    break;
                case 'bot-log':
                    this.logChannel = chanenl;
                    break;
            }
        });
        if (!this.generalChannel) {
            console.log('There is no "general" channel');
            this.client.destroy();
            return;
        }
    }
    onMessage(msg) {
        if (msg.author.bot) {
            return;
        }
        let messageListeners = [
            this.mentionManager.handleMessage(msg),
            this.reactionManager.handleMessage(msg),
            this.commandManager.handleMessage(msg)
        ];
        Promise.all(messageListeners)
            .catch(logger_1.logger.log);
    }
    onGuildMemberAdd(member) {
        this.generalChannel.send(`Привет, <@${member.user.id}>! Меня зовут Писосыч, но пока что я нихуя не умею`);
    }
    sendLogMessage(msg) {
        if (!this.logChannel) {
            console.log('There is no log channgel');
            return;
        }
        this.logChannel.sendMessage(msg.toString());
    }
}
exports.AppBot = AppBot;
console.log(config_1.CONFIG.token);
const client = new discord_js_1.Client();
exports.appBot = new AppBot(client);
//# sourceMappingURL=app-bot.js.map