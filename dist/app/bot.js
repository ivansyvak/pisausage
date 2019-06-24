"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const mention_manager_1 = require("./messages/mentions/mention-manager");
const logger_1 = require("./logger");
const reaction_manager_1 = require("./messages/reactions/reaction-manager");
class Bot {
    constructor(client) {
        this.client = client;
        this.mentionManager = new mention_manager_1.MentionManager();
        this.reactionManager = new reaction_manager_1.ReactionManager();
        client.on('ready', this.onReady.bind(this));
        client.on('message', this.onMessage.bind(this));
        client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
    }
    onReady() {
        this.client.channels.forEach(chanenl => {
            if (chanenl instanceof discord_js_1.TextChannel && chanenl.name == 'general') {
                this.generalChanel = chanenl;
            }
        });
    }
    onMessage(msg) {
        if (msg.author.bot) {
            return;
        }
        let messageListeners = [
            this.mentionManager.handleMessage(msg),
            this.reactionManager.handleMessage(msg)
        ];
        Promise.all(messageListeners)
            .catch(logger_1.logger.log);
    }
    onGuildMemberAdd(member) {
        this.generalChanel.send(`Привет, <@${member.user.id}>! Меня зовут Сосисыч, но пока что я нихуя не умею`);
    }
}
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map