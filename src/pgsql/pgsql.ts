const { Client } = require('pg');

export class ConnParameters {
    public host    : string = '';
    public port    : number = 5432;
    public user    : string = '';
    public password: string = '';
    public database: string = '';
    constructor(host:string, port:number, user: string, password: string, database: string ) {
        this.host       = host;
        this.port       = port;
        this.user       = user;
        this.password   = password;
        this.database   = database;
    }

    static init(host:string, port:number, user: string, password: string, database: string) {
        return new ConnParameters(host, port, user, password, database);
    }
}

const 
    client = Client;

const 
    paramQuery = {
        page    : 1, 
        start   : 0, 
        limit   : 0,
        sql     : '',
        countSql: '',
        values  : [],
        timeout : 4000
    };
    
export {paramQuery};

export default class PgSql {
    private static _instance : PgSql;
    public isConected   : boolean = false;
    private param       : ConnParameters;
    public  conn        : any;

    constructor(param : ConnParameters) {
        this.param  = param;
        this.conn   = new Client(param);
    }

    static create(param : ConnParameters){
        return this._instance || new PgSql(param);
    }
     /**
     * Función para conectarse al servidor
     * @param connected callback
     * @param failure callback
     */
    async connect (){
        await   this.conn.connect();
    }
    /**
     * Cierra la conexión a la base de datos
     * @param callback private : Retorna el estado del cierre  
     */
    async close (clear : boolean = false){
        await this.conn.end();
        if(clear){
            this.conn   = undefined;
        }
    }

    /**
     * Changes connection Cambiar a una nueva conexión de base de datos
     * @param param Los parametos de la nueva conexión.
     */
    changeConnection(param : ConnParameters){
        if(this.conn){
            this.conn.end();
            this.conn   = undefined;
        }
        this.conn   = new Client(param);
    }
    /**
     * Connections params Retorna los parametros de la nueva conexión
     * @param nit Nit de la empresa
     * @returns  Parametos de conexión
     */
    async connectionParams(nit:string){
        let sql = `SELECT * FROM empresas WHERE nit= ${ nit } AND estado = 'A'`;
        try {
            await this.conn.connect();
            const resp   = await this.conn.query(sql);
            if(resp.rows.length <= 0){
                throw new Error("Error al consutar los datos de conexión.");
            }
            const row   = resp.rows[0];
            await this.close(true);
            return  ConnParameters.init(row.dirip, row.puerto, row.nomusuario, row.clave, row.nombd);
        } catch (error) {
            console.log(error);
            throw new Error("Error en el servidor");
        }
    }

    /**
     * Cambia el nombre de la base de datos para las nueas conexiones
     * @param name Nombre de la base de datos para la nueva conexión
     */
    changeDatabase(name : string){
        if(name.length === 0) return false;
        if(name != this.param.database){
            // this.param.database = name;
            // this.connect((res : object)=>{
            //     this.conn.changeUser({database : name}, (err) => {
            //         if (err) throw err;
            //         return true;
            //     });
            // },(err : object)=>{
            //     throw err ;
            // });     
        }else{
            return false;
        }
    }  
    
    private responseTexError(err : any ) {
        let
            text = {
                code        : err.code        || 0,
                index       : 0,
                sql         : err.sql         || '',
                sqlMessage  : err.sqlMessage  || '',
                sqlState    : err.sqlState    || ''
            };

        return JSON.stringify(text);
    }

    private requestFailure(error : any) {
        return error ? {
            success     : false,
            status      : 409,
            responseText: this.responseTexError(error),
            statusText  : error.sqlState || ''
        } : error;
    }

    private requestSucces(result : [], total : number) {
        return result ? {
            success         : true,
            status          : 200,
            responseText    : JSON.stringify({
                records : result    || [],
                total   : total     || 0
            }),
            statusText      : ''
        } : result;
    }

    deleteData(param : {table : string, values : []}, callback : Function) {
        let 
            sql : string;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `DELETE FROM ${param.table} WHERE ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        } catch (error) {
            throw error;
        }
    }

    updateData(param : {table : string, values : []}, callback : Function) {
        let 
            sql : string;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `UPDATE ${param.table} SET ? WHERE ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        } catch (error) {
            throw error;
        }
    }

    insertData(param : {table : string, values : {}}, callback : Function) {
        let 
            sql : string;
        try {
            // if(param.table.length > 0 && param.values) {
            //     sql = `INSERT INTO ${param.table} SET ? `;
            //     this.conn.query(sql, param.values, (err, result) =>{
            //         callback(err, result, result ? result.insertId : 0);
            //     });
            // }else{
            //     throw new Error('Error en la base de datos.');
            // }
        } catch (error) {
            throw error;
        }
    }

    query(param :{ sql:string, values:[], where: string,  timeout:40000}, encode : boolean, callback : Function){
        let 
        where       : string,
        query       = { 
            sql     : '',
            values  : [],
            timeout : 0
        };
        where      = (param.where.length > 0) ? ` WHERE ${param.where}` : '';

        query.sql   = `${param.sql}${where}`;

        if(param.timeout && param.timeout > 0 )       query.timeout   = param.timeout;
        if(param.values && param.values.length > 0 )  query.values    = param.values;

        
    }

    async sqlQuery(sql:string){
        try {
            await   this.conn.connect();
            const resp   = this.conn.query(sql);
            // await   this.conn.end();
            return resp;
        } catch (error) {
            console.log(error);
            throw new Error("Error en el servidor");
        }
    }

    pagingQuery (param :{page:1, start:number, limit:number, sql:string, values:[], where: string,  countSql:string, timeout:40000},callback : Function) {
        let 
            sLimit      : string,
            sWhere      : string,
            total       : number = 0,
            queryCount  =  { 
                sql     : '',
                values  : [],
                timeout : 0
            },
            query       = { 
                    sql     : '',
                    values  : [],
                    timeout : 0
                };

        try {
            if(param.sql.length > 0){

                sLimit      = (param.limit > 0) ? ` LIMIT ${param.start}, ${param.limit} ` : '';
                sWhere      = (param.where.length > 0) ? ` WHERE ${param.where}` : '';
                query.sql   = `${param.sql}${sWhere}${sLimit}`;

                if(param.timeout && param.timeout > 0 )       query.timeout   = param.timeout;
                if(param.values && param.values.length > 0 )  query.values    = param.values;
            }
        } catch (error) {
            throw error;
        }
    }
}