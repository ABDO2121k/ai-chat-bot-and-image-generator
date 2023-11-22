import express from "express"
import { verify } from "../utils/Token.js"
import { clearChat, generatChat, getChat } from "../controller/chat.js"
// import { newChat } from "../controller/chat.js"


// protected API
const router=express.Router()

router.post("/new",verify,generatChat)
router.post("/getAll",verify,getChat)
router.delete("/clearChat",verify,clearChat)


// router.post("/new",newChat)

// router.post("/new",verify,newChat)



export default router