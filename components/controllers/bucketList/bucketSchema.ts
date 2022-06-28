import { model, Model, Schema, Types } from "mongoose";
import { IBucketList } from "./buckeInterface";

const bucketSchema:Schema = new Schema({
    wishName:{type:String},
    isDone:{type:Boolean},
    isActive:{type:Boolean},
    parent:[{
        type:Types.ObjectId,
        ref:"User"
    }],
    isDoneBy:[{
        type:Types.ObjectId,
        ref:"Father"
    }]

},{
    timestamps:true
},)

export const bucketModel:Model<IBucketList> = model<IBucketList>('Bucket',bucketSchema)
