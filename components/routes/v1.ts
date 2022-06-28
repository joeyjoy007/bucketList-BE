import bucketList from "../controllers/bucketList";
import father from "../controllers/father";
import user from "../controllers/user";

export default [
    ...user,
    ...father,
    ...bucketList
]