"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../utils/utils");
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.create = function () {
        return this._instance || new Auth();
    };
    Auth.prototype.api = function (req, res, next) {
        var tokenA = req.get('Authorization');
        jsonwebtoken_1.default.verify(tokenA, utils_1.dbConfg.privateKey, function (err, decode) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: err
                });
            }
            req.user = decode.user;
            next();
        });
    };
    return Auth;
}());
exports.default = Auth;
