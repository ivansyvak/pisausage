import { MessageListener } from "../message-listener";
import { Message } from "discord.js";
import { MentionSubject } from "./mention-subject";
import { danyaMentions } from "./mention-danya";
import { dianaMention } from "./mention-diana";

const mentionedList: {[key: string] : MentionSubject} = {
  'Даня': danyaMentions,
  'Данил': danyaMentions,
  'Диана': dianaMention
};

export class MentionManager implements MessageListener {
  async handleMessage(msg: Message): Promise<any> {
    for (let name in mentionedList) {
      if (!msg.content.includes(name)) {
        continue;
      }

      let mentionSubject = mentionedList[name];
      msg.reply(mentionSubject.getMessage());
    }
  }
}
