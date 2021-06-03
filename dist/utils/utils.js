"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_EXPIRATION = exports.server = exports.serverSocket = exports.io = exports.dbCfg = exports.ssl_options = exports.dbConfg = void 0;
var config_1 = require("../configs/config");
var server_1 = __importDefault(require("../server/server"));
var sockect = require("socket.io");
var http = require("http");
var https = require("https");
var fs = require("fs");
var dbCfg = JSON.parse(fs.readFileSync('configs/dbCfg.json', 'utf8'))[0];
exports.dbCfg = dbCfg;
var ssl_options = {
    key: fs.readFileSync('certificate/client.key').toString(),
    cert: fs.readFileSync('certificate/client.crt').toString(),
    ca: fs.readFileSync('certificate/client-ca.crt').toString()
};
exports.ssl_options = ssl_options;
var dbConfg = {
    host: dbCfg.DATABASE_HOST,
    port: dbCfg.DATABASE_PORT,
    user: dbCfg.DATABASE_USER,
    password: dbCfg.DATABASE_PASSWORD,
    database: dbCfg.DATABASE_NAME,
    server: dbCfg.SERVER_PORT,
    privateKey: dbCfg.PRIVATE_KEY
};
exports.dbConfg = dbConfg;
var TOKEN_EXPIRATION = 60 * 60 * 24 * 1;
exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
var server = server_1.default.init(dbConfg.server, config_1.SSL_USE, ssl_options);
exports.server = server;
var serverSocket = http.createServer(server.app);
exports.serverSocket = serverSocket;
if (server.useSSL) {
    exports.serverSocket = serverSocket = https.createServer(server.sslOptions, server.app);
}
var io = sockect(serverSocket);
exports.io = io;
