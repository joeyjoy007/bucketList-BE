import userController from "./userController";

export default  [
    {
        path:"/create",
        method:"post",
        escapeAuth:true,
        handler:[userController.createUser]
    },
    {
        path:"/login",
        method:"post",
        escapeAuth:true,
        handler:[userController.loginUser]
    },
    {
        path:"/fetch",
        method:"get",
        // escapeAuth:true,
        handler:[userController.fetchAllUser]
    },
]