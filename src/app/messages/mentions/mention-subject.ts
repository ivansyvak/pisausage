export class MentionSubject {
  private index: number = 0;
  messages: string[] = [];

  getMessage(): string {
    if (!this.messages.length) {
      return "Я хз что сказать";
    }

    if (this.index == this.messages.length) {
      this.index = 0;
    }

    return this.messages[this.index++];
  }
}
