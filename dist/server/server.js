"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(port, ssl, sslOptions) {
        this.port = port;
        this.useSSL = ssl;
        this.sslOptions = (ssl) ? sslOptions : {};
        this.app = express();
    }
    /**
     * Constructor de clase del servidor
     * @param port number :  Puerto de coneción del servidor
     */
    Server.init = function (port, ssl, sslOptions) {
        return new Server(port, ssl, sslOptions);
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    };
    Server.prototype.start = function (callback) {
        // this.app.listen(this.port, callback());
        this.publicFolder();
    };
    return Server;
}());
exports.default = Server;
