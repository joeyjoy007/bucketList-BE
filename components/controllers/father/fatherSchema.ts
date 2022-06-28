import { IFather } from './fatherInterface';
import { model, Model, Types } from 'mongoose';
import { Schema } from 'mongoose';

const fatherSchema:Schema = new Schema({
    name:{type:String},
    parent:[{
        type:Types.ObjectId
    }],
    age:{type:String},
    child:[{
        type:Types.ObjectId,
        ref:'User'
    }],
    caste:{type:String}

})
export const Father:Model<IFather> = model<IFather>('Father',fatherSchema)