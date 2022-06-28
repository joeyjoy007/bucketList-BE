import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './components/config/config'
import Logging from './components/library/Logging'
import v1 from './components/routes/v1'
import { applyRoutes } from './components/utils/Wrapper'

const router = express()
const r1 = express.Router()

/* Connect to mongoose*/

mongoose.connect(config.mongo.monogUrl).
then(()=>{
    Logging.info("Connected To database")

    startServer()
}).catch
((error)=>{
    Logging.warn("Unable to connec")
    Logging.error(error.message)
})


const startServer = ()=>{
    router.use((req,res,next)=>{
        Logging.info(`Incoming -> Method [${req.method}] -Url: [${req.url}] -IP: [${req.socket.remoteAddress}] -Status:[${res.statusCode}]`)

        res.on('finish',()=>{
            Logging.info(`Incoming -> Method [${req.method}] -Url: [${req.url}] -IP: [${req.socket.remoteAddress}] -Status: [${res.statusCode}]`)
        })

        next()
    })
    
    router.use(express.urlencoded({extended:true}))
    router.use(express.json())

    router.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin',"*");
        res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With,Content-Type,Accept,Authorization")

        if(req.method === "options"){
            res.header('Access-Control-Allow-Methods',"PUT,POST,PATCH,DELETE,GET");
            return res.status(200).json({})
        }
        next()
    })
    /**routes */
// router.use(UserRoutes)
router.use(applyRoutes(v1,r1))


    /**testing */

    router.get('/ping',(req,res,next)=>res.status(200).json({message:"pong"}))

    /**Error handeling */


    router.use((req,res,next)=>{
        const error = new Error("Not found")
        Logging.error(error)

        return res.status(404).json({
            message:error.message
        })
    })

    http.createServer(router).listen(config.server.port,()=> Logging.info
        (`Server is running on port ${config.server.port}`)
    )
   
}