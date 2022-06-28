import { Father } from '../father/fatherSchema';
import { HTTP400Error } from './../../utils/HttpError';
import { userInterface } from "./userInterface";
import { User } from "./userSchema";

class UserMaker{
    public async createUser (data:userInterface){

        const user = new User(data)
        await user.save()
        const findFather = await Father.findOne({caste:"jain"})
        if(findFather && findFather._id){
        const fatherUpdate = await Father.findByIdAndUpdate({_id:findFather._id},{
            $push:{child:user._id}
      
        })
        const childUpdateParent = await User.findByIdAndUpdate({_id:user._id},{
            $push:{parent:findFather._id}
        })
    }
    return user
    }

    public async loginUser ({email,password}:{email:string,password:string}){
        
            if(!email || !password){
                throw new HTTP400Error("email and password required")
            }

            else{
                const user = await User.findOne({email})
            if(!user){
                throw new HTTP400Error("user not found")
            }
            else{
                const matchPassword = await user.comparePassword(password)

                if(!matchPassword){
                    throw new HTTP400Error("invalid credentials")
                }
                else{
                    return user
                }
            }
            }
        
      
    }

    public async fetchAllUser (){

        const user = await User.find()
        // .populate({
        //     path:"parent",
        //     populate:({
        //         path:"child"
        //     })
        // })
        // return user
    }
}

export default new UserMaker()