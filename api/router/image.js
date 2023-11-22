import express from 'express'
import { clearChat, generatImg, getChat } from '../controller/img.js';
import { verify } from '../utils/Token.js';


const router=express.Router()

router.post('/newI',verify,generatImg)
router.post('/getAllI',verify,getChat)
router.delete("/clearChatI",verify,clearChat)



export default router;