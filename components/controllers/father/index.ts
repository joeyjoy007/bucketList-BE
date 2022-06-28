import fatherController from "./fatherController";

export default[
    {
        path:'/fcreate',
        method:"post",
        escapeAuth:true,
        handler:[fatherController.createFather]

    }
]