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
const express_1 = require("express");
const app_error_1 = require("../common/app-error");
const user_service_1 = require("../services/user-service");
const phrase_service_1 = require("../services/phrase-service");
exports.phraseRouter = express_1.Router();
exports.phraseRouter.use('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.method == 'OPTIONS') {
        next();
        return;
    }
    let tmpKey = req.body.tmpKey;
    if (!tmpKey) {
        next(new app_error_1.AppError(401, 'Unauthorized'));
        return;
    }
    let requestUser = yield user_service_1.userService.getUserByTmpKey(tmpKey);
    if (!requestUser) {
        next(new app_error_1.AppError(401, 'Unauthorized'));
        return;
    }
    next();
}));
exports.phraseRouter.post('/list', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let tmpKey = req.body.tmpKey;
        let user = yield user_service_1.userService.getUserByTmpKey(tmpKey);
        let data = yield phrase_service_1.phraseService.readByUserId(user.id);
        res.json(data || []);
    }
    catch (e) {
        next(e);
    }
}));
exports.phraseRouter.post('/create', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let p = yield phrase_service_1.phraseService.create(req.body);
        res.json(p);
    }
    catch (e) {
        next(e);
    }
}));
exports.phraseRouter.post('/update', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield phrase_service_1.phraseService.update(req.body);
        res.json({});
    }
    catch (e) {
        next(e);
    }
}));
exports.phraseRouter.post('/delete', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield phrase_service_1.phraseService.delete(req.body.key, req.body.id);
        res.json({});
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=phrase-route.js.map