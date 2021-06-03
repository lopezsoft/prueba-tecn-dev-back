import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dbConfg } from "../utils/utils";

export default class Auth {
    private static _instance : Auth;

    static create(){
        return this._instance || new Auth();
    }

    api(req: any, res: response , next){
        let tokenA   = req.get('Authorization');
        jwt.verify(tokenA, dbConfg.privateKey, (err: any, decode: any) =>{
            if (err){
                return res.status(401).json({
                    success : false,
                    error   : err
                });
            } 
            req.user    = decode.user;
            next();
        });
    }  
}