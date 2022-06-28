import { NextFunction, Request,Response } from "express";
import { generateToken } from "../../helpers/generateToken";
import ResponseHandler from "../../utils/ResponseHandler";
import UserMaker from "./userModel";
import { User } from "./userSchema";

class UserController{
    public async createUser (req:Request,res:Response,next:NextFunction){
        const responseHandler = new ResponseHandler()
            try {
               responseHandler
               .reqRes(req,res)
               .onCreate("user created",await UserMaker.createUser(req.body))
               .send()
            } catch (error:any) {
                next(responseHandler.sendError(error));
            }
    }

    public async loginUser (req:Request,res:Response,next:NextFunction){
        const responseHandler = new ResponseHandler()
            try {
                const user = await UserMaker.loginUser(req.body)
                let token:any;
                if(user){
                    token = await generateToken(user._id)
                }

               responseHandler
               .reqRes(req,res)
               .onFetch("login success",{user,token})
               .send()
            } catch (error:any) {
                next(responseHandler.sendError(error));
            }
    }

    public async fetchAllUser (req:Request,res:Response,next:NextFunction){
        const responseHandler = new ResponseHandler()
            try {
               responseHandler
               .reqRes(req,res)
               .onFetch("user fetched",await UserMaker.fetchAllUser())
               .send()
            } catch (error:any) {
                next(responseHandler.sendError(error));
            }
    }
}

export default new UserController()