import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";


import PgSql, { ConnParameters } from "../pgsql/pgsql";
import { dbConfg, TOKEN_EXPIRATION } from "../utils/utils";
import Auth from "../middlewares/autentication";

const
    router = Router();

const oauth = Auth.create();

router.get('/students', oauth.api, (req: Request, res: Response) => {
    res.json({
        user        : req.user,
        student_id  : 1,
        name        : 'Lewis Lopez Gomez'
    });
});

router.get('/searchByCourtCode', oauth.api, async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.query;
    try {
        if(!body.company){
            res.status(400).json({
                success : false,
                Error   : 'Debe pasar el NIT de la empresa.'
            });
        }
        if(!body.query){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar un texto para la búsqueda.'
            });
        }else{
            const param         = await pg.connectionParams(body.company);
            const newParamDb    = ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
            pg.changeConnection(newParamDb);
           
            const sql   = `SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, 
                           b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado, 
                           TRIM(c.apellidos) AS ncliente, c.id_cliente as cliente FROM tdato001 as a 
                           INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  
                           INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  
                           INNER JOIN tdata011 as c ON a.cliente = c.id_cliente
                           WHERE a.codjuz = '${ body.query }' ORDER BY ncliente`;
            const resp = await pg.sqlQuery(sql);
            await pg.close();

            res.json({
                success : true,
                records : resp.rows,
                total   : resp.rows.length   
            });    
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/searchJudget', oauth.api, async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.query;
    try {
        if(!body.company){
            res.status(400).json({
                success : false,
                Error   : 'Debe pasar el NIT de la empresa.'
            });
        }
        if(!body.query){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar un texto para la búsqueda.'
            });
        }else{
            const param         = await pg.connectionParams(body.company);
            const newParamDb    = ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
            pg.changeConnection(newParamDb);
           
            const sql   = `SELECT tj.codjuz, TRIM(tj.nombrejuz) AS nombrejuz, tj.id_ciu, TRIM(tc.nombreciu) AS nombreciu 
                            FROM tdato006 AS tj 
                            LEFT JOIN tdato008 as tc ON tj.id_ciu = tc.codciudad 
                            WHERE LOWER(tc.nombreciu) LIKE LOWER('%${ body.query }%') ORDER BY tj.nombrejuz`;
            const resp = await pg.sqlQuery(sql);
            await pg.close();

            res.json({
                success : true,
                records : resp.rows,
                total   : resp.rows.length   
            });    
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/searchCounterpart', oauth.api, async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.query;
    try {
        if(!body.company){
            res.status(400).json({
                success : false,
                Error   : 'Debe pasar el NIT de la empresa.'
            });
        }
        if(!body.query){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar un texto para la búsqueda.'
            });
        }else{
            const param         = await pg.connectionParams(body.company);
            const newParamDb    = ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
            pg.changeConnection(newParamDb);
           
            const sql   = `SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, 
                           b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado,
                           TRIM(c.apellidos) AS ncliente, c.id_cliente as cliente FROM tdato001 as a 
                           INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  
                           INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  
                           INNER JOIN tdata011 as c ON a.cliente = c.id_cliente
                           WHERE LOWER(b.apellido) LIKE LOWER('%${ body.query }%') ORDER BY b.apellido`;
            const resp = await pg.sqlQuery(sql);
            await pg.close();

            res.json({
                success : true,
                records : resp.rows,
                total   : resp.rows.length   
            });    
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/searchCustomer', oauth.api, async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.query;
    try {
        if(!body.company){
            res.status(400).json({
                success : false,
                Error   : 'Debe pasar el NIT de la empresa.'
            });
        }
        if(!body.query){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar un texto para la búsqueda.'
            });
        }else{
            const param         = await pg.connectionParams(body.company);
            const newParamDb    = ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
            pg.changeConnection(newParamDb);
           
            const sql   = `SELECT a.idnegocio as nup,a.valor,a.fecha,a.ideman2,a.ideman3,a.radjudi, 
                            b.id_cddo as iddeman, TRIM(b.apellido) AS contra_parte,TRIM(b.direccion) AS direccion,TRIM(tj.nombrejuz) AS juzgado, 
                            TRIM(c.apellidos) AS ncliente, CAST(c.id_cliente AS VARCHAR) as cliente FROM tdato001 as a 
                            INNER JOIN tdata015 as b ON a.id_demandado = b.id_cddo  
                            INNER JOIN tdato006 as tj ON a.codjuz = tj.codjuz  
                            INNER JOIN tdata011 as c ON a.cliente = c.id_cliente 
                            WHERE LOWER(c.apellidos) LIKE LOWER('%${ body.query }%') ORDER BY c.apellidos`;
            const resp = await pg.sqlQuery(sql);
            await pg.close();

            res.json({
                success : true,
                records : resp.rows,
                total   : resp.rows.length   
            });    
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.body;
    try {
        if(!body.company){
            res.status(400).json({
                success : false,
                Error   : 'Debe pasar el NIT de la empresa.'
            });
        }
        if(!body.password || !body.user){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar la contraseña o el usuario'
            });
        }else{
            const param         = await pg.connectionParams(body.company);
            const newParamDb    = ConnParameters.init(param.host, param.port, param.user, param.password, param.database);
            pg.changeConnection(newParamDb);
           
            const sql   = `SELECT usuario,nombre,nitcc FROM tuser AS t WHERE uestado = 'A' AND 
                           decrypt(mclav,decode('password','escape'::text),'aes'::text) = '${ body.password }' AND usuario = '${ body.user }'`;
            const resp = await pg.sqlQuery(sql);
            await pg.close();
            if(resp.rows.length <= 0){
                res.status(400).json({
                    success : false,
                    Error   : 'Usuario o contraseña incorrecto.'
                });
            }else{
                let token   = jwt.sign({
                    user    : resp.rows[0]
                }, dbConfg.privateKey, { expiresIn: TOKEN_EXPIRATION });

                res.json({
                    success : true,
                    records : resp.rows[0],
                    token   
                });    
            }
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/validateCompany', async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb),
        body    = req.query;
    try {
        if(!body.nit){
            res.status(400).json({
                success : false,
                Error   : 'Debe ingresar el NIT  de la empresa'
            });
        }else{
            const resp = await pg.sqlQuery(`SELECT nit, nombre, mensaje FROM empresas WHERE nit= ${ body.nit } AND estado = 'A'`);
            await pg.close();
            if(resp.rows.length > 0){
                res.json({
                    success : true,
                    records : resp.rows[0]
                });    
            }else{
                res.status(400).json({
                    success : false,
                    error   : 'No hay datos para el NIT ingresado'
                });    
            }
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/sql', async (req: Request, res: Response) => {
    const
        paramDb = ConnParameters.init(dbConfg.host, dbConfg.port, dbConfg.user, dbConfg.password, dbConfg.database);

    let
        pg      = PgSql.create(paramDb);
    try {
        const resp = await pg.sqlQuery('SELECT * FROM empresas');
        console.log(resp.rows);
        await pg.close();
        res.json({
            success : true,
            records : resp.rows,
            total   : resp.rows.length
        });    
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error   : error.message
        });
    }
});

router.get('/chat', (req: Request, res: Response) => {
    res.json({
        student_id: 1,
        name: 'Lewis Lopez'
    });
});

export default router;