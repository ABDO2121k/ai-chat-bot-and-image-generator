import express from "express"
import { getUsers, login, logout, signUp, veriToken } from "../controller/user.js"


const router=express.Router()

router.get("/",getUsers)
router.post("/signup",signUp)
router.post("/login",login)
router.get("/auth-status",veriToken)
router.get("/logout",logout)




// express-validator kaydirlna wa7d l middle ware bax ntestiw req 3ad nsftoha


export default router