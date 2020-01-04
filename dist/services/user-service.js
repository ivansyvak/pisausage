"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crud_service_1 = require("./crud-service");
const app_error_1 = require("../common/app-error");
const bot_service_1 = require("./bot-service");
const user_model_1 = require("../models/user-model");
const phrase_service_1 = require("./phrase-service");
let counter = 0;
class UserService extends crud_service_1.CRUDService {
    constructor() {
        super(...arguments);
        this.users = {};
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.readOne(data.id);
            if (user) {
                return user;
            }
            user = new user_model_1.UserModel(data.id, data.tmpKey);
            this.users[data.id] = user;
            phrase_service_1.phraseService.init(user.id);
            return yield this.readOne(data.id);
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = Object.values(this.users);
            let res = [];
            for (let i in data) {
                res.push(yield this.readOne(data[i].id));
            }
            return data;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = this.users[id];
            if (!user) {
                return;
            }
            let botUser = bot_service_1.botService.getUser(user.id);
            user.username = botUser.username;
            user.tag = botUser.tag;
            user.avatarURL = botUser.avatarURL;
            user.displayAvatarURL = botUser.displayAvatarURL;
            return user;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = this.users[id];
            if (!user) {
                throw new app_error_1.AppError(404, "User not found");
            }
            delete this.users[id];
        });
    }
    getUserByTmpKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.read();
            for (let user of users) {
                if (user.tmpKey == key) {
                    return user;
                }
            }
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user-service.js.map