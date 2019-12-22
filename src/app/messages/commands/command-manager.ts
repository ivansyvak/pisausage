import { MessageListener } from "../message-listener";
import { Message, TextChannel } from "discord.js";
import { IMAGE_LIST } from "../../image-list";

export class CommandManager implements MessageListener {
  async handleMessage(msg: Message) {
    let stringArray = msg.content.split('!');
    if (stringArray.length <= 1) {
      return;
    }
    
    let command = stringArray[1].split(' ')[0];
    let image = undefined;
    switch (command) {
      case 'lulu':
      case 'лулу':
      case 'лулуша':
        image = IMAGE_LIST.lulu_n1;
        break;

      case 'петух':
        image = IMAGE_LIST.cock;
        break;

      case 'liar':
      case 'непизди':
        image = IMAGE_LIST.liar;
        break;

    }

    if (image != undefined) {
      this.sendImage(msg.channel as TextChannel, image);
    }
  }

  private sendImage(channel: TextChannel, imageURL: string) {
    channel.send(imageURL);
  }

}