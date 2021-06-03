
import {SERVER_PORT, SSL_USE} from   '../configs/config';
import Server from '../server/server';
import sockect  = require('socket.io');
import http     = require('http');
import https    = require('https');

import fs       = require('fs');
const
    dbCfg       = JSON.parse(fs.readFileSync('configs/dbCfg.json', 'utf8'))[0];
const
    ssl_options = {
        key : fs.readFileSync('certificate/client.key').toString(),
        cert: fs.readFileSync('certificate/client.crt').toString(),
        ca  : fs.readFileSync('certificate/client-ca.crt').toString()
    };

const 
    dbConfg = {
        host        : dbCfg.DATABASE_HOST,
        port        : dbCfg.DATABASE_PORT,
        user        : dbCfg.DATABASE_USER,
        password    : dbCfg.DATABASE_PASSWORD,
        database    : dbCfg.DATABASE_NAME,
        server      : dbCfg.SERVER_PORT,
        privateKey  : dbCfg.PRIVATE_KEY
    };

const TOKEN_EXPIRATION  = 60 * 60 * 24 * 1;

const 
    server = Server.init(dbConfg.server, SSL_USE , ssl_options);

let 
    serverSocket    = http.createServer(server.app);
if(server.useSSL){
    serverSocket    = https.createServer(server.sslOptions, server.app);
}


let 
    io = sockect(serverSocket);

export  {dbConfg};
export  {ssl_options};
export  {dbCfg};
export  {io};
export  {serverSocket};
export  {server};
export  {TOKEN_EXPIRATION};