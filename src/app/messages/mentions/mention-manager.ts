import { MessageListener } from "../message-listener";
import { Message } from "discord.js";
import { MentionSubject } from "./mention-subject";
import { danyaMentions } from "./mention-danya";
import { dianaMention } from "./mention-diana";
import { hahaMention } from "./mention-haha";
import { sashaMention } from "./mention-sasha";
import { ivanMention } from "./mention-ivan";
import { katyaMention } from "./mention-katya";

const mentionedList: {[key: string] : MentionSubject} = {
  'Даня': danyaMentions,
  'даня': danyaMentions,
  'Данил': danyaMentions,
  'данил': danyaMentions,

  'Диана': dianaMention,
  'диана': dianaMention,
  
  'haha': hahaMention,  
  'хаха': hahaMention,
  'hahA': hahaMention,  
  'хахА': hahaMention,

  'Саша': sashaMention,
  'саша': sashaMention,

  'Ваня': ivanMention,
  'ваня': ivanMention,

  'Катя': katyaMention,
  'катя': katyaMention,
  'Катюша': katyaMention,
  'катюша': katyaMention
};

export class MentionManager implements MessageListener {
  async handleMessage(msg: Message): Promise<any> {
    if (msg.content.includes('нет') || msg.content.includes('Нет')) {
      msg.reply('Пидора ответ! хахА');
      return;
    }

    if (msg.content.includes('нит') || msg.content.includes('Нит')) {
      msg.reply('Пидора отвит! хахА');
      return;
    }

    if (msg.content.includes('иди нахуй') || msg.content.includes('Иди нахуй')) {
      msg.reply('Своим помахуй');
      return;
    }

    for (let name in mentionedList) {
      if (!msg.content.includes(name)) {
        continue;
      }

      let mentionSubject = mentionedList[name];
      msg.reply(mentionSubject.getMessage());
    }
  }
}
