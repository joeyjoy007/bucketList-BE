import { User } from './../user/userSchema';
import { IBucketList } from "./buckeInterface";
import { BucketModel } from "./bucketSchema";

class BucketMaker{
    public async createBucket(data:IBucketList){
        const bucket =  new BucketModel(data)
        await bucket.save()

        if(bucket && bucket._id){
            const userWish = await User.findByIdAndUpdate({_id:bucket.parent},{
                $push:{myWish:bucket._id}
            })
            return userWish
        }
        return bucket
    }
}

export default new BucketMaker()