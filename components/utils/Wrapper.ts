import { NextFunction, Request, Response, Router } from "express";
import protect from "./Authentication";

type Handler = (req:Request,res:Response,next:NextFunction)=>Promise<void> | void;

export interface IGetUserAuth extends Request{
user:any
}

export interface IRoute{
path:string | string[],
method:string,
escapeAuth?:boolean,
handler:Handler[]|any
}

export const applyRoutes=(routes:IRoute[],router:Router)=>{
for(const route of routes){
    const {method,path,escapeAuth,handler} = route
    if(escapeAuth){
        (router as any)[method](path,handler)
    }
    else{
        (router as any)[method](path,protect,handler)
    }
}
return router
}