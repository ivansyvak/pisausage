import { Client, Message, GuildMember, TextChannel } from "discord.js";
import { MentionManager } from "./messages/mentions/mention-manager";
import { logger } from './logger';
import { ReactionManager } from "./messages/reactions/reaction-manager";
import { CommandManager } from "./messages/commands/command-manager";

export class Bot {

  private generalChannel: TextChannel;
  private quoteslChannel: TextChannel;

  private mentionManager: MentionManager = new MentionManager();
  private reactionManager: ReactionManager = new ReactionManager();
  private commandManager: CommandManager = new CommandManager();

  constructor(private client: Client) {
    client.on('ready', this.onReady.bind(this));
    client.on('message', this.onMessage.bind(this));
    client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
  }

  private onReady() {
    this.client.channels.forEach(chanenl => {
      if (!(chanenl instanceof TextChannel)) {
        return;
      }

      switch ((chanenl as TextChannel).name) {
        case 'general':
        case 'основная-нора':
            this.generalChannel = chanenl as TextChannel;
          break;

          // case 'whiskey-room':
          //     this.generalChannel = chanenl as TextChannel;
          //     this.generalChannel.send('Лера лера лера лера лера лера лера');

        case 'quotes':
            this.quoteslChannel = chanenl as TextChannel;            
          break;        
      }     
    });

    if (!this.generalChannel) {
      console.log('There is no "general" channel')
      this.client.destroy();
      return;
    }


  }

  private onMessage(msg: Message) {
    if (msg.author.bot) {
      return;
    }

    let messageListeners = [
      this.mentionManager.handleMessage(msg),
      this.reactionManager.handleMessage(msg),
      this.commandManager.handleMessage(msg)
    ];

    Promise.all(messageListeners)
      .catch(logger.log);
  }

  private onGuildMemberAdd(member: GuildMember) {
    this.generalChannel.send(`Привет, <@${member.user.id}>! Меня зовут Сосисыч, но пока что я нихуя не умею`);
  }

}
