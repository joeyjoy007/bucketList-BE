import { HTTP400Error } from './../../utils/HttpError';
import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../../utils/ResponseHandler";
import bucketModel from './bucketModel';

class BucketController{
    public async createBucket(req:Request,res:Response,next:NextFunction){
        const responseHandler = new ResponseHandler()

        try {
            responseHandler
            .reqRes(req,res)
            .onCreate("Bucket created",await bucketModel.createBucket(req.body))
            .send()
        } catch (error) {
            throw new HTTP400Error(" Sorry! Bucket not created ")
        }
    }
}


export default new BucketController()