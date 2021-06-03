"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var utils_1 = require("./utils/utils");
var router_1 = __importDefault(require("./routes/router"));
utils_1.server.app.use(bodyParser.urlencoded({ extended: true }));
utils_1.server.app.use(router_1.default);
utils_1.server.publicFolder();
utils_1.serverSocket.listen(utils_1.server.port, function () {
    console.log('Servidor sokets', utils_1.server.port);
});
