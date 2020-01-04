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
const bot_service_1 = require("../services/bot-service");
const user_service_1 = require("../services/user-service");
const app_error_1 = require("../common/app-error");
exports.userRouter = express_1.Router();
exports.userRouter.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let data = yield user_service_1.userService.readOne(req.params.id);
        if (!data) {
            throw new app_error_1.AppError(404, "User not found");
        }
        res.json(data);
    }
    catch (e) {
        next(e);
    }
}));
exports.userRouter.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let data = yield user_service_1.userService.read();
        res.json(data);
    }
    catch (e) {
        next(e);
    }
}));
exports.userRouter.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!req.body.tmpKey) {
            throw new app_error_1.AppError(422, 'Request parameter "tmpKey" is not specified');
        }
        let tmpKey = bot_service_1.botService.getTmpKey(req.body.tmpKey);
        if (!tmpKey) {
            throw new app_error_1.AppError(404, 'Incorrect tmpKey');
        }
        let botUser = bot_service_1.botService.getUser(tmpKey.payload);
        if (!botUser) {
            throw new app_error_1.AppError(404, 'Sorry, seems like Pisausage doesn\'t know you');
        }
        let obj = {
            id: botUser.id,
        };
        let user = yield user_service_1.userService.create(obj);
        res.statusCode = 200;
        res.json(user);
    }
    catch (e) {
        next(e);
    }
}));
exports.userRouter.put('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield user_service_1.userService.update(req.params.id, req.body);
        res.json({});
    }
    catch (e) {
        next(e);
    }
}));
exports.userRouter.delete('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield user_service_1.userService.delete(req.params.id);
        res.json({});
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=user-route.js.map