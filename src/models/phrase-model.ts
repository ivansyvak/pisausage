export class PhraseModel {
  key: string;
  id: string | number;
  author: string;
  content: string;

  constructor(author: string, content: string, key: string) {
    this.key = key;
    this.author = author;
    this.content = content;
  }
}
