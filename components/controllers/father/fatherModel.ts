import { IFather } from './fatherInterface';
import { Father } from "./fatherSchema"

class FatherMaker{
public async createFather(data:IFather){
    const father = await new Father(data)
    await father.save()
    return father

}
}

export default new FatherMaker()