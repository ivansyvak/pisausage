import { CRUDService } from "./crud-service";
import { AppError } from "../common/app-error";
import { botService } from "./bot-service";
import { UserModel } from "../models/user-model";
import { phraseService } from "./phrase-service";

let counter = 0;

class UserService extends CRUDService<UserModel> {
  private users: {[key: number]: UserModel} = {};

  async create(data: any) {
    let user = await this.readOne(data.id);
    if (user) {
      return user;
    }

    user = new UserModel(data.id, data.tmpKey);

    this.users[data.id] = user;
    phraseService.init(user.id);

    return await this.readOne(data.id);
  }

  async read() {
    let data = Object.values(this.users);

    let res = [];
    for (let i in data) {
      res.push(await this.readOne(data[i].id));
    }

    return data;
  }

  async readOne(id: string): Promise<UserModel> {
    let user = this.users[id];
    if (!user) {
      return;
    }

    let botUser = botService.getUser(user.id);

    user.username = botUser.username;
    user.tag = botUser.tag;
    user.avatarURL = botUser.avatarURL;
    user.displayAvatarURL = botUser.displayAvatarURL;

    return user;
  }

  async update(id: string, data: UserModel) {}

  async delete(id: string) {
    let user = this.users[id];
    if (!user) {
      throw new AppError(404, "User not found");
    }

    delete this.users[id];
  }

  async getUserByTmpKey(key: string) {
    let users = await this.read();
    for (let user of users) {
      if (user.tmpKey == key) {
        return user;
      }
    }
  }

}

export const userService = new UserService();
