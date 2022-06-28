import { IGetUserAuth } from './Wrapper';
import { NextFunction, Request, Response } from "express";
import  jwt from "jsonwebtoken";
import { User } from "../controllers/user/userSchema";
import { HTTP400Error } from "./HttpError";

const protect = async(req:IGetUserAuth,res:Response,next:NextFunction)=>{
    let token:any;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]

            const decode:any = await jwt.verify(token,"GARVIT")

            console.log("DEcode => ", decode)

            req.user = await User.findById(decode._id).select('-password')

            next()
        } catch (error:any) {
            throw new HTTP400Error(error)
        }
    }

    if(!token){
        throw new HTTP400Error("Token not found")
    }
}

export default protect