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
const mention_danya_1 = require("./mention-danya");
const mention_diana_1 = require("./mention-diana");
const mention_haha_1 = require("./mention-haha");
const mention_sasha_1 = require("./mention-sasha");
const mention_ivan_1 = require("./mention-ivan");
const mentionedList = {
    'Даня': mention_danya_1.danyaMentions,
    'даня': mention_danya_1.danyaMentions,
    'Данил': mention_danya_1.danyaMentions,
    'данил': mention_danya_1.danyaMentions,
    'Диана': mention_diana_1.dianaMention,
    'диана': mention_diana_1.dianaMention,
    'haha': mention_haha_1.hahaMention,
    'хаха': mention_haha_1.hahaMention,
    'hahA': mention_haha_1.hahaMention,
    'хахА': mention_haha_1.hahaMention,
    'Саша': mention_sasha_1.sashaMention,
    'саша': mention_sasha_1.sashaMention,
    'Ваня': mention_ivan_1.ivanMention,
    'ваня': mention_ivan_1.ivanMention
};
class MentionManager {
    handleMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.includes('нет') || msg.content.includes('Нет')) {
                msg.reply('Пидора ответ! хахА');
                return;
            }
            if (msg.content.includes('нит') || msg.content.includes('Нит')) {
                msg.reply('Пидора отвит! хахА');
                return;
            }
            for (let name in mentionedList) {
                if (!msg.content.includes(name)) {
                    continue;
                }
                let mentionSubject = mentionedList[name];
                msg.reply(mentionSubject.getMessage());
            }
        });
    }
}
exports.MentionManager = MentionManager;
//# sourceMappingURL=mention-manager.js.map