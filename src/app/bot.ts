import { Client, Message, GuildMember, TextChannel } from "discord.js";
import { MentionManager } from "./messages/mentions/mention-manager";
import { logger } from './logger';
import { ReactionManager } from "./messages/reactions/reaction-manager";

export class Bot {  

  private generalChanel: TextChannel;
  private mentionManager: MentionManager = new MentionManager();
  private reactionManager: ReactionManager = new ReactionManager();

  constructor(private client: Client) {
    client.on('ready', this.onReady.bind(this));
    client.on('message', this.onMessage.bind(this));
    client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
  }

  private onReady() {
    this.client.channels.forEach(chanenl => {
      if (chanenl instanceof TextChannel && (chanenl as TextChannel).name == 'general') {
        this.generalChanel = chanenl;
      }
    });    
  }

  private onMessage(msg: Message) {
    if (msg.author.bot) {
      return;
    }
    
    let messageListeners = [
      this.mentionManager.handleMessage(msg),
      this.reactionManager.handleMessage(msg)
    ];

    Promise.all(messageListeners)
      .catch(logger.log);   
  }

  private onGuildMemberAdd(member: GuildMember) {
    this.generalChanel.send(`Привет, <@${member.user.id}>! Меня зовут Сосисыч, но пока что я нихуя не умею`);
  }

}
