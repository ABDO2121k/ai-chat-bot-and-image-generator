import {body,ValidationChain} from 'express-validator'
import {request,response,NextFunction} from 'express'

const validate=(validations:ValidationChain[])=>{
       return async (req:Request,res:Response,next:NextFunction)
}

const signupValidator=[
    body("name").notEmpty().withMessage("name is required"),
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({min:6}).withMessage("password should contain at least 6 characters ")
]
// canxofo wax empty ila kan empti aysft dak l msg f res