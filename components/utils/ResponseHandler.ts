import { Request, Response } from "express";
import { IErrorResponse } from "../interface/interface";
import { HTTP400Error, HTTP401Error, HTTP403Error, HTTP404Error, HTTP409Error } from "./HttpError";
export class ICustomError extends Error{
    error?:any
}
class ResponseHandler implements IErrorResponse{

    status= 1;
    statusCode = 200;
    error?:string;
    message = 'Success';
    description?:string;
    payload?:any;
    req?:Request;
    res?:Response;

    public setData(message:string,payload?:any,description?:string){
        this.message = message || 'Successfull',
        this.payload = payload || undefined,
        this.description = description || undefined,
        this.error = undefined
    }

    public setErrorData(error: string, message: string, description?: string) {
        this.message = message;
        this.description = description;
        this.error = error;
    }

    reqRes(req:Request,res:Response){
        this.req = req,
        this.res = res
        return this
    }

    onCreate(message:string ,payload?:any, description?:string){
        this.statusCode = 201,
        this.status = 1,
        this.setData(message,payload,description)
        return this
    }
    
    onFetch(message:string ,payload?:any ,description?:string){
        this.statusCode = 200,
        this.status = 1,
        this.setData(message,payload,description)
        return this
    }

    onClientError(statusCode:number,error:string,message:string,description?:string){

        this.statusCode = statusCode || 400;
        this.status = 0;
        this.setErrorData(error, message, description);
        this.payload = undefined;
        return this;
    }
    
    onServerError(error: string, message: string, description?: string) {
        this.statusCode = 500;
        this.status = 0;
        this.setErrorData(error, message, description);
        this.payload = undefined;
        return this;
    }

    /** Send Void() */
send():void{
    if(!this.req || !this.res){
        throw new Error("Please set req res function to get started")
    }

    const response:IErrorResponse= {
        status:this.status,
        statusCode:this.statusCode,
        error:this.error,
        message:this.message,
        description:this.description,
        payload:this.payload

    }

    this.res.status(this.statusCode).json(response)
    
}
sendError(e: ICustomError) {
    if (e instanceof HTTP400Error) {
        return new HTTP400Error(e.message, e.description);
    }
    if (e instanceof HTTP401Error) {
        return new HTTP401Error(e.message, e.description);
    }
    if (e instanceof HTTP403Error) {
        return new HTTP403Error(e.message, e.description);
    }
    if (e instanceof HTTP404Error) {
        return new HTTP404Error(e.message, e.description);
    }
    if (e instanceof HTTP409Error) {
        return new HTTP409Error(e.message, e.description);
    }
    if (e.name === 'ValidationError') {
        return new HTTP400Error(e.message, 'Schema validation error.');
    }
    if (e.name === 'MongoError') {
        return new HTTP400Error(e.message, 'Schema validation error.');
    }

    return e;
}
    
}

export default ResponseHandler