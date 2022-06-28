import { HTTP400Error } from './../../utils/HttpError';
import { model, Model, Schema, Types } from "mongoose";
import { IUserModel } from "./userInterface";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "../../config";

const userSchema:Schema = new Schema({
    name:{type:String},
    parent:[{
        type:Types.ObjectId,
        ref:"Father"
    }],
    phoneNumber:{type:Number},
    email:{type:String},
    password:{type:String},
    type:{type:String},
    profilePic:{type:String},
    myWish:[{
        type:Types.ObjectId,
        ref:"Bucket"
    }]

},
{timestamps:true},
)

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next(null)
    }
    else{
        this.password = await bcrypt.hash(this.password,SALT_ROUNDS)
    }
})

userSchema.methods.comparePassword = async function(password:string){
    const matchPassword = await bcrypt.compare(password,this.password)

    if(!matchPassword ){
        throw new HTTP400Error("passwords do not match")
    }

    return matchPassword
}

export const User :Model<IUserModel> = model<IUserModel>('User',userSchema)