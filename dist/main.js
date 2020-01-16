"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_route_1 = require("./routes/user-route");
const bot_service_1 = require("./services/bot-service");
const app_error_1 = require("./common/app-error");
const phrase_route_1 = require("./routes/phrase-route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use('/users', user_route_1.userRouter);
app.use('/phrases', phrase_route_1.phraseRouter);
app.use('/', (req, res) => {
    throw new app_error_1.AppError(404, '"Unknown api endpoint');
});
app.use((err, req, res, next) => {
    if (err instanceof app_error_1.AppError) {
        res.status(err.code);
        res.json(Object.assign({}, err, { error: true }));
    }
    else {
        res.status(500);
        res.json(err.toString());
    }
});
bot_service_1.botService.start();
app.listen(3000);
//# sourceMappingURL=main.js.map