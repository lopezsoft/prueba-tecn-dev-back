"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramQuery = exports.ConnParameters = void 0;
var Client = require('pg').Client;
var ConnParameters = /** @class */ (function () {
    function ConnParameters(host, port, user, password, database) {
        this.host = '';
        this.port = 5432;
        this.user = '';
        this.password = '';
        this.database = '';
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }
    ConnParameters.init = function (host, port, user, password, database) {
        return new ConnParameters(host, port, user, password, database);
    };
    return ConnParameters;
}());
exports.ConnParameters = ConnParameters;
var client = Client;
var paramQuery = {
    page: 1,
    start: 0,
    limit: 0,
    sql: '',
    countSql: '',
    values: [],
    timeout: 4000
};
exports.paramQuery = paramQuery;
var PgSql = /** @class */ (function () {
    function PgSql(param) {
        this.isConected = false;
        this.param = param;
        this.conn = new Client(param);
    }
    PgSql.create = function (param) {
        return this._instance || new PgSql(param);
    };
    /**
    * Función para conectarse al servidor
    * @param connected callback
    * @param failure callback
    */
    PgSql.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cierra la conexión a la base de datos
     * @param callback private : Retorna el estado del cierre
     */
    PgSql.prototype.close = function (clear) {
        if (clear === void 0) { clear = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.end()];
                    case 1:
                        _a.sent();
                        if (clear) {
                            this.conn = undefined;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Changes connection Cambiar a una nueva conexión de base de datos
     * @param param Los parametos de la nueva conexión.
     */
    PgSql.prototype.changeConnection = function (param) {
        if (this.conn) {
            this.conn.end();
            this.conn = undefined;
        }
        this.conn = new Client(param);
    };
    /**
     * Connections params Retorna los parametros de la nueva conexión
     * @param nit Nit de la empresa
     * @returns  Parametos de conexión
     */
    PgSql.prototype.connectionParams = function (nit) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resp, row, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM empresas WHERE nit= " + nit + " AND estado = 'A'";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.conn.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.conn.query(sql)];
                    case 3:
                        resp = _a.sent();
                        if (resp.rows.length <= 0) {
                            throw new Error("Error al consutar los datos de conexión.");
                        }
                        row = resp.rows[0];
                        return [4 /*yield*/, this.close(true)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, ConnParameters.init(row.dirip, row.puerto, row.nomusuario, row.clave, row.nombd)];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Error en el servidor");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cambia el nombre de la base de datos para las nueas conexiones
     * @param name Nombre de la base de datos para la nueva conexión
     */
    PgSql.prototype.changeDatabase = function (name) {
        if (name.length === 0)
            return false;
        if (name != this.param.database) {
            // this.param.database = name;
            // this.connect((res : object)=>{
            //     this.conn.changeUser({database : name}, (err) => {
            //         if (err) throw err;
            //         return true;
            //     });
            // },(err : object)=>{
            //     throw err ;
            // });     
        }
        else {
            return false;
        }
    };
    PgSql.prototype.responseTexError = function (err) {
        var text = {
            code: err.code || 0,
            index: 0,
            sql: err.sql || '',
            sqlMessage: err.sqlMessage || '',
            sqlState: err.sqlState || ''
        };
        return JSON.stringify(text);
    };
    PgSql.prototype.requestFailure = function (error) {
        return error ? {
            success: false,
            status: 409,
            responseText: this.responseTexError(error),
            statusText: error.sqlState || ''
        } : error;
    };
    PgSql.prototype.requestSucces = function (result, total) {
        return result ? {
            success: true,
            status: 200,
            responseText: JSON.stringify({
                records: result || [],
                total: total || 0
            }),
            statusText: ''
        } : result;
    };
    PgSql.prototype.deleteData = function (param, callback) {
        var sql;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `DELETE FROM ${param.table} WHERE ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        }
        catch (error) {
            throw error;
        }
    };
    PgSql.prototype.updateData = function (param, callback) {
        var sql;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `UPDATE ${param.table} SET ? WHERE ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        }
        catch (error) {
            throw error;
        }
    };
    PgSql.prototype.insertData = function (param, callback) {
        var sql;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `INSERT INTO ${param.table} SET ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result, result ? result.insertId : 0);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        }
        catch (error) {
            throw error;
        }
    };
    PgSql.prototype.query = function (param, encode, callback) {
        var where, query = {
            sql: '',
            values: [],
            timeout: 0
        };
        where = (param.where.length > 0) ? " WHERE " + param.where : '';
        query.sql = "" + param.sql + where;
        if (param.timeout && param.timeout > 0)
            query.timeout = param.timeout;
        if (param.values && param.values.length > 0)
            query.values = param.values;
    };
    PgSql.prototype.sqlQuery = function (sql) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.conn.connect()];
                    case 1:
                        _a.sent();
                        resp = this.conn.query(sql);
                        // await   this.conn.end();
                        return [2 /*return*/, resp];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Error en el servidor");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PgSql.prototype.pagingQuery = function (param, callback) {
        var sLimit, sWhere, total = 0, queryCount = {
            sql: '',
            values: [],
            timeout: 0
        }, query = {
            sql: '',
            values: [],
            timeout: 0
        };
        try {
            if (param.sql.length > 0) {
                sLimit = (param.limit > 0) ? " LIMIT " + param.start + ", " + param.limit + " " : '';
                sWhere = (param.where.length > 0) ? " WHERE " + param.where : '';
                query.sql = "" + param.sql + sWhere + sLimit;
                if (param.timeout && param.timeout > 0)
                    query.timeout = param.timeout;
                if (param.values && param.values.length > 0)
                    query.values = param.values;
            }
        }
        catch (error) {
            throw error;
        }
    };
    return PgSql;
}());
exports.default = PgSql;
