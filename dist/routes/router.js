"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var pgsql_1 = __importStar(require("../pgsql/pgsql"));
var utils_1 = require("../utils/utils");
var autentication_1 = __importDefault(require("../middlewares/autentication"));
var router = express_1.Router();
var oauth = autentication_1.default.create();
router.get('/students', oauth.api, function (req, res) {
    res.json({
        user: req.user,
        student_id: 1,
        name: 'Lewis Lopez Gomez'
    });
});
router.get('/searchByCourtCode', oauth.api, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, param, newParamDb, sql, resp, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!body.company) {
                    res.status(400).json({
                        success: false,
                        Error: 'Debe pasar el NIT de la empresa.'
                    });
                }
                if (!!body.query) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar un texto para la búsqueda.'
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, pg.connectionParams(body.company)];
            case 3:
                param = _a.sent();
                newParamDb = pgsql_1.ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
                pg.changeConnection(newParamDb);
                sql = "SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, \n                           b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado, \n                           TRIM(c.apellidos) AS ncliente, c.id_cliente as cliente FROM tdato001 as a \n                           INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  \n                           INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  \n                           INNER JOIN tdata011 as c ON a.cliente = c.id_cliente\n                           WHERE a.codjuz = '" + body.query + "' ORDER BY ncliente";
                return [4 /*yield*/, pg.sqlQuery(sql)];
            case 4:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 5:
                _a.sent();
                res.json({
                    success: true,
                    records: resp.rows,
                    total: resp.rows.length
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_1.message
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get('/searchJudget', oauth.api, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, param, newParamDb, sql, resp, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!body.company) {
                    res.status(400).json({
                        success: false,
                        Error: 'Debe pasar el NIT de la empresa.'
                    });
                }
                if (!!body.query) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar un texto para la búsqueda.'
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, pg.connectionParams(body.company)];
            case 3:
                param = _a.sent();
                newParamDb = pgsql_1.ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
                pg.changeConnection(newParamDb);
                sql = "SELECT tj.codjuz, TRIM(tj.nombrejuz) AS nombrejuz, tj.id_ciu, TRIM(tc.nombreciu) AS nombreciu \n                            FROM tdato006 AS tj \n                            LEFT JOIN tdato008 as tc ON tj.id_ciu = tc.codciudad \n                            WHERE LOWER(tc.nombreciu) LIKE LOWER('%" + body.query + "%') ORDER BY tj.nombrejuz";
                return [4 /*yield*/, pg.sqlQuery(sql)];
            case 4:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 5:
                _a.sent();
                res.json({
                    success: true,
                    records: resp.rows,
                    total: resp.rows.length
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_2.message
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get('/searchCounterpart', oauth.api, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, param, newParamDb, sql, resp, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!body.company) {
                    res.status(400).json({
                        success: false,
                        Error: 'Debe pasar el NIT de la empresa.'
                    });
                }
                if (!!body.query) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar un texto para la búsqueda.'
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, pg.connectionParams(body.company)];
            case 3:
                param = _a.sent();
                newParamDb = pgsql_1.ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
                pg.changeConnection(newParamDb);
                sql = "SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, \n                           b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado,\n                           TRIM(c.apellidos) AS ncliente, c.id_cliente as cliente FROM tdato001 as a \n                           INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  \n                           INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  \n                           INNER JOIN tdata011 as c ON a.cliente = c.id_cliente\n                           WHERE LOWER(b.apellido) LIKE LOWER('%" + body.query + "%') ORDER BY b.apellido";
                return [4 /*yield*/, pg.sqlQuery(sql)];
            case 4:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 5:
                _a.sent();
                res.json({
                    success: true,
                    records: resp.rows,
                    total: resp.rows.length
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_3.message
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get('/searchCustomer', oauth.api, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, param, newParamDb, sql, resp, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!body.company) {
                    res.status(400).json({
                        success: false,
                        Error: 'Debe pasar el NIT de la empresa.'
                    });
                }
                if (!!body.query) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar un texto para la búsqueda.'
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, pg.connectionParams(body.company)];
            case 3:
                param = _a.sent();
                newParamDb = pgsql_1.ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
                pg.changeConnection(newParamDb);
                sql = "SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, \n                            b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado, \n                            TRIM(c.apellidos) AS ncliente, CAST(c.id_cliente AS VARCHAR) as cliente FROM tdato001 as a \n                            INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  \n                            INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  \n                            INNER JOIN tdata011 as c ON a.cliente = c.id_cliente \n                            WHERE LOWER(c.apellidos) LIKE LOWER('%" + body.query + "%') ORDER BY c.apellidos";
                return [4 /*yield*/, pg.sqlQuery(sql)];
            case 4:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 5:
                _a.sent();
                res.json({
                    success: true,
                    records: resp.rows,
                    total: resp.rows.length
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_4.message
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, param, newParamDb, sql, resp, token, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!body.company) {
                    res.status(400).json({
                        success: false,
                        Error: 'Debe pasar el NIT de la empresa.'
                    });
                }
                if (!(!body.password || !body.user)) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar la contraseña o el usuario'
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, pg.connectionParams(body.company)];
            case 3:
                param = _a.sent();
                newParamDb = pgsql_1.ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
                pg.changeConnection(newParamDb);
                sql = "SELECT usuario,nombre,nitcc FROM tuser AS t WHERE uestado = 'A' AND \n                           decrypt(mclav,decode('password','escape'::text),'aes'::text) = '" + body.password + "' AND usuario = '" + body.user + "'";
                return [4 /*yield*/, pg.sqlQuery(sql)];
            case 4:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 5:
                _a.sent();
                if (resp.rows.length <= 0) {
                    res.status(400).json({
                        success: false,
                        Error: 'Usuario o contraseña incorrecto.'
                    });
                }
                else {
                    token = jsonwebtoken_1.default.sign({
                        user: resp.rows[0]
                    }, utils_1.dbConfg.privateKey, { expiresIn: utils_1.TOKEN_EXPIRATION });
                    res.json({
                        success: true,
                        records: resp.rows[0],
                        token: token
                    });
                }
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_5.message
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get('/validateCompany', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, body, resp, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb), body = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!!body.nit) return [3 /*break*/, 2];
                res.status(400).json({
                    success: false,
                    Error: 'Debe ingresar el NIT  de la empresa'
                });
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, pg.sqlQuery("SELECT nit, nombre, mensaje FROM empresas WHERE nit= " + body.nit + " AND estado = 'A'")];
            case 3:
                resp = _a.sent();
                return [4 /*yield*/, pg.close()];
            case 4:
                _a.sent();
                if (resp.rows.length > 0) {
                    res.json({
                        success: true,
                        records: resp.rows[0]
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        error: 'No hay datos para el NIT ingresado'
                    });
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_6 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_6.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.get('/sql', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramDb, pg, resp, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramDb = pgsql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, utils_1.dbConfg.database);
                pg = pgsql_1.default.create(paramDb);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, pg.sqlQuery('SELECT * FROM empresas')];
            case 2:
                resp = _a.sent();
                console.log(resp.rows);
                return [4 /*yield*/, pg.close()];
            case 3:
                _a.sent();
                res.json({
                    success: true,
                    records: resp.rows,
                    total: resp.rows.length
                });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                res.status(500).json({
                    success: false,
                    error: error_7.message
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/chat', function (req, res) {
    res.json({
        student_id: 1,
        name: 'Lewis Lopez'
    });
});
exports.default = router;
