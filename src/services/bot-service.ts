import { CONFIG } from '../config';

import { Client, Message, GuildMember, TextChannel, DMChannel, User } from "discord.js";
import * as uid from 'uniqid';

interface TmpKey {
  key: string;
  expiring: Date;
  payload: any;
}

export class BotService {
  private client: Client;
  private generalChannel: TextChannel;

  private tmpKeys: {[key: string]: TmpKey} = {};

  public version = "0.0.1";

  constructor() {
    this.client = new Client();

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('guildMemberAdd', this.onGuildMemberAdd.bind(this));
  }

  public start() {
    this.client.login(CONFIG.token);
    setInterval(this.checkTmpData.bind(this), 24 * 60 * 60 * 1000);
  }

  private onReady() {
  }

  private onMessage(msg: Message) {
    if (msg.channel instanceof DMChannel) {
      this.handleDMC(msg);
      return;
    }
  }

  private handleDMC(msg) {
    if (msg.content.includes('!login')) {
      this.startRegistration(msg);
      return;
    }
  }

  private startRegistration(msg: Message) {
    let expiringDate = new Date();
    expiringDate.setHours(expiringDate.getHours() + 24);

    let tmpKey = uid(8);
    this.tmpKeys[tmpKey] = {
      expiring: expiringDate,
      key: tmpKey,
      payload: msg.author.id
    }
    
    msg.author.send(`Код активации: ${tmpKey}`);
  }

  private onGuildMemberAdd(member: GuildMember) {
    this.generalChannel.send(`Привет, <@${member.user.id}>! Меня зовут Писосыч, но пока что я нихуя не умею`);
  }

  public getUsers(): User[] {
    return this.client.users
      .filter(user => !user.bot)
      .array();
  }

  public getUser(id: string) {
    return this.client.users.get(id);
  }

  public getTmpKey(tmpKey: string): TmpKey {
    return this.tmpKeys[tmpKey];
  }

  public removeTmpKey(tmpKey: string) {
    delete this.tmpKeys[tmpKey];
  }

  public sendMessage(id: string, message: string) {
    let user = this.client.users.get(id);
    if (user) {
      user.sendMessage(message);
    }
  }

  private checkTmpData() {
    let curDate = new Date();
    let toRemove = [];
    for (let key in this.tmpKeys) {
      let tmpKey = this.tmpKeys[key];
      if (tmpKey.expiring < curDate) {
        toRemove.push(key);
      }
    }

    toRemove.forEach(key => (delete this.tmpKeys[key]));
  }
}

export const botService = new BotService();
