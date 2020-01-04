import { CRUDService } from "./crud-service";
import { AppError } from "../common/app-error";
import { botService } from "./bot-service";
import { UserModel } from "../models/user-model";

let counter = 0;

class UserService extends CRUDService<UserModel> {
  private users: {[key: number]: UserModel} = {};

  async create(data: any) {
    let user = await this.readOne(data.id);
    if (user) {
      return user;
    }

    user = new UserModel(data.id);

    this.users[data.id] = user;

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

  async readOne(id: string) {
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
}

export const userService = new UserService();
