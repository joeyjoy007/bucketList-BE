import { Document, Types } from "mongoose";

export interface fatherInterface{
    name:string,
    parent:Types.ObjectId,
    age:string,
    child:Types.ObjectId,
    caste:string
}

export interface IFather extends Document,fatherInterface{}