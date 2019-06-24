import { MessageListener } from "../message-listener";
import { Message } from "discord.js";

export class ReactionManager implements MessageListener {
  async handleMessage(msg: Message) {
    // if (msg.author.tag.includes('Катюша')) {
    //   msg.reply('Хатьфу');
    // }
  }
}
