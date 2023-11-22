import express from "express"
import User from './user.js'
import Chat from './Chats.js'
import Img from './image.js'

const router=express.Router()

router.use("/user",User)
router.use("/chat",Chat)
router.use('/img',Img)


export default router