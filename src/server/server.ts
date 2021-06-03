import express      = require('express');
import bodyParser   = require('body-parser');
import path         = require('path');

export default class Server {
    public  app         : express.Application; 
    public  port        : number;   
    public useSSL       : boolean; 
    public sslOptions   : object;
    
    constructor(port : number, ssl : boolean, sslOptions : object){
        this.port       = port;
        this.useSSL     = ssl;
        this.sslOptions = (ssl) ? sslOptions : {}; 
        this.app        = express();
    }
    /**
     * Constructor de clase del servidor
     * @param port number :  Puerto de coneción del servidor
     */
    static init(port : number, ssl : boolean, sslOptions : object){
        return new Server(port,ssl, sslOptions);
    }

    publicFolder(){
        const 
            publicPath = path.resolve(__dirname,'../public');
        this.app.use(express.static(publicPath));
    }

    start( callback :  Function){
        // this.app.listen(this.port, callback());
        this.publicFolder();
    }

}
