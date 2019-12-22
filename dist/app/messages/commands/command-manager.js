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
const image_list_1 = require("../../image-list");
class CommandManager {
    handleMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringArray = msg.content.split('!');
            if (stringArray.length <= 1) {
                return;
            }
            let command = stringArray[1].split(' ')[0];
            let image = undefined;
            switch (command) {
                case 'lulu':
                case 'лулу':
                case 'лулуша':
                    image = image_list_1.IMAGE_LIST.lulu_n1;
                    break;
                case 'петух':
                    image = image_list_1.IMAGE_LIST.cock;
                    break;
                case 'liar':
                case 'непизди':
                    image = image_list_1.IMAGE_LIST.liar;
                    break;
            }
            if (image != undefined) {
                this.sendImage(msg.channel, image);
            }
        });
    }
    sendImage(channel, imageURL) {
        channel.send(imageURL);
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=command-manager.js.map