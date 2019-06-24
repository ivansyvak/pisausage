import { Message } from "discord.js";

export interface MessageListener {
  handleMessage: (msg: Message) => Promise<any>;
}
