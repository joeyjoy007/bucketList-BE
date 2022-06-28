import bucketController from "./bucketController";

export default[
    {
        path:'/bcreate',
        method:'post',
        escapeAuth:true,
        handler:[bucketController.createBucket]
    }
]