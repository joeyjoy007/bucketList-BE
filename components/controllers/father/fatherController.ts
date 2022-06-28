import { NextFunction, Request, Response } from "express"
import ResponseHandler from "../../utils/ResponseHandler";
import fatherModel from "./fatherModel";

class FatherController{
    public async createFather (req:Request,res:Response,next:NextFunction){
        const responseHandler = new ResponseHandler()
            try {
               responseHandler
               .reqRes(req,res)
               .onCreate("user created",await fatherModel.createFather(req.body))
               .send()
            } catch (error:any) {
                next(responseHandler.sendError(error));
            }
    }
}

export default new FatherController() 