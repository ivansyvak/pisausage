export class MentionSubject {
  messages: string[] = [];

  getMessage(): string {
    return this.messages[0];
  }
}
