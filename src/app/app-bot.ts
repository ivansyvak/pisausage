import { CONFIG } from '../config';

import { Client, Message, GuildMember, TextChannel } from "discord.js";
import { MentionManager } from "./messages/mentions/mention-manager";
import { logger } from './logger';
import { ReactionManager } from "./messages/reactions/reaction-manager";
import { CommandManager } from "./messages/commands/command-manager";

export class AppBot {

  private generalChannel: TextChannel;
  private quoteslChannel: TextChannel;

  private mentionManager: MentionManager = new MentionManager();
  private reactionManager: ReactionManager = new ReactionManager();
  private commandManager: CommandManager = new CommandManager();
  private logChannel: TextChannel;

  constructor(private client: Client) {
    client.on('ready', this.onReady.bind(this));
    client.on('message', this.onMessage.bind(this));
    client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
  }

  public async start(): Promise<string> {
    return this.client.login(CONFIG.token);
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

        case 'quotes':
            this.quoteslChannel = chanenl as TextChannel;            
          break;        

        case 'bot-log':
          this.logChannel = chanenl as TextChannel;
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
    this.generalChannel.send(`Привет, <@${member.user.id}>! Меня зовут Писосыч, но пока что я нихуя не умею`);
  }

  public sendLogMessage(msg: string) {
    if (!this.logChannel) {
      console.log('There is no log channgel');
      return;
    }

    this.logChannel.sendMessage(msg.toString());
  }
}

console.log(CONFIG.token);

const client = new Client();
export const appBot = new AppBot(client)
