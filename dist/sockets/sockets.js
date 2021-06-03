"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importStar(require("../mysql/mysql"));
var utils_1 = require("../utils/utils");
utils_1.io.on('connection', function (socket) {
    console.log('Servidor sockets');
    /*Devuelve el resultado de un consulta sql*/
    socket.on('sqlQuerySQL', function (data, params) {
        var paramDb = mysql_1.ConnParameters.init(utils_1.dbConfg.host, utils_1.dbConfg.port, utils_1.dbConfg.user, utils_1.dbConfg.password, (data.dataName) ? data.dataName : utils_1.dbConfg.database, utils_1.dbConfg.charset);
        var mysql = mysql_1.default.create(paramDb);
        var total = 0, sLimit = params['limit'] ? ' LIMIT ' + params['start'] + ',' + params['limit'] : '', sWhere = data.pdbWhereFields ? ' WHERE ' + data.pdbWhereFields : '', values = data.pdbWhereValues ? data.pdbWhereValues : '', fiels = data.pdbFields ? data.pdbFields : '*', sSQLTable = 'SELECT COUNT(*) total FROM ' + data.pdbQuery + sWhere, sSQL = 'SELECT ' + fiels + ' FROM ' + data.pdbQuery + sWhere + sLimit;
        // mysql.pagingQuery();
        // conn.query({
        //         sql     : sSQLTable,
        //         timeout : 40000, // 40s
        //         values  : values
        //     },
        //     function(error, result) {
        //         if (result) {
        //             total = result[0]['total'];
        //             conn.query({
        //                     sql     : sSQL,
        //                     timeout : 40000, // 40s
        //                     values  : values
        //                 },(error, result) => {
        //                     conn.end((err) => {
        //                         if(err) console.log(err);
        //                         socket.emit('requestQuerySQL', requestSucces(result, total), requestFailure(error));
        //                         conn.destroy();
        //                     });
        //                 }
        //             )
        //         } else {
        //             conn.end((err) => {
        //                 if(err) console.log(err);
        //                 socket.emit('requestQuerySQL', requestSucces(result, total), requestFailure(error));
        //                 conn.destroy();
        //             });
        //         }
        //     }
        // );
    });
});
