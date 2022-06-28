import {Document, Types} from 'mongoose'

export interface userInterface{
    name:string,
    parent:Types.ObjectId,
    phoneNumber:number
    email:string
    password:string
    type:string
    profilePic:string
}

export interface IUserModel extends Document,userInterface{
    comparePassword(p:string)
}