import { Document, Types } from "mongoose";

export interface bucketInterface{
    wishName:string,
    isDone:boolean,
    isActive:boolean,
    parent:Types.ObjectId,
    isDoneBy:Types.ObjectId

}

export interface IBucketList extends Document,bucketInterface{}