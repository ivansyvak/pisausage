export class UserModel {
  id: string;
  tmpKey: string;
  username: string;
  tag: string;
  avatarURL: string;
  displayAvatarURL: string;

  constructor(id: string, tmpKey: string) {
    this.id = id;
    this.tmpKey = tmpKey;
  }
}