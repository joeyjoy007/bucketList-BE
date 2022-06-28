import { model, Model, Schema, Types } from "mongoose";
import { IBucketList } from "./buckeInterface";

const bucketSchema:Schema = new Schema({
    wishName:{type:String},
    isDone:{type:Boolean,default:false},
    isActive:{type:Boolean,default:false},
    // parent:[{
    //     type:Types.ObjectId,
    //     ref:"User"
    // }],
    parent:{type:Types.ObjectId},
    isDoneBy:[{
        type:Types.ObjectId,
        ref:"Father"
    }]

},{
    timestamps:true
},)

export const BucketModel:Model<IBucketList> = model<IBucketList>('Bucket',bucketSchema)
