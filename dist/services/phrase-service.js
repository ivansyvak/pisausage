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
const phrase_model_1 = require("../models/phrase-model");
const app_error_1 = require("../common/app-error");
class PhraseService extends crud_service_1.CRUDService {
    constructor() {
        super(...arguments);
        this.counter = 0;
        this.phrases = {};
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new phrase_model_1.PhraseModel(data.author, data.content, data.key);
            model.id = ++this.counter;
            if (!this.phrases[model.key]) {
                this.phrases[model.key] = {};
            }
            this.phrases[model.key][model.id] = model;
            return this.phrases[model.key];
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.phrases[id];
        });
    }
    readByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            let data = this.phrases;
            for (let key in data) {
                for (let extraKey in data[key]) {
                    let phrase = data[key][extraKey];
                    if (phrase.author == id) {
                        res.push(phrase);
                    }
                }
            }
            return res;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.phrases[data.key] || !this.phrases[data.key][data.id]) {
                throw new app_error_1.AppError(404, `Key ${data.key} not found in phrases`);
            }
            this.phrases[data.key][data.id] = data;
        });
    }
    delete(id, extraId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.phrases[id] && !this.phrases[id][extraId]) {
                throw new app_error_1.AppError(404, `Phrase with keys ${id}, ${extraId} not found`);
            }
            delete this.phrases[id][extraId];
        });
    }
    init(key) {
        this.phrases[key] = {};
    }
}
exports.phraseService = new PhraseService();
//# sourceMappingURL=phrase-service.js.map