import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers= async (req,res)=>{
    try{
        const users=await User.find()
        return res.status(200).json({message:"OK",users})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"ERROR",cause:err.message})
    }
}


export const signUp= async (req,res)=>{
    try{
         const {name,email,password}=req.body
         const exists=await User.findOne({email})
         if(exists) return res.status(501).send("ERROR user already registered")
        //hash the password and create a user
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        const user=new User({name,email,password:hash})
        await user.save() // ymclna ndiro had lmethod wlla User.create
        return res.status(200).json({message:"OK", id:user._id.toString()})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"ERROR",cause:err.message})
    }
}




export const login= async (req,res)=>{
    try{
         const {email,password}=req.body
         const exists=await User.findOne({email})
         if(!exists) return res.status(401).send("User not registered")
         // compararaison de mot passe 
         let validPassword = bcrypt.compareSync(password,exists.password)
         if (!validPassword) return res.status(403).send(" invalid password !")
        // hadi kandiroha bax ila l user logged in w madarx logged out w d5l compte jdid ;
        res.clearCookie("auth_token",{
            httpOnly:true,
            signed:true
        })
        //nswbo token
        const _id=exists._id.toString()
        const em=exists.email
        const nom=exists.name
        const payload={id:_id,email:em,name:nom}

        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        const twoHours = 2 * 60 * 60 * 1000;

         res.cookie("auth_token",token,{
            httpOnly:true,
            signed:true,
            maxAge:twoHours

         }).status(200).json({id:_id,email:em,name:nom})
        //salina mn token
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"ERROR",cause:err.message})
    }
}


export const logout=(req,res)=>{

    res.clearCookie("auth_token",{
        httpOnly:true,signed:true
    }).status(200).json("user has been logged out")
}


// verifie token 

export const veriToken= async (req,res)=>{
    const token =req.signedCookies[`${process.env.COOKIE_NAME}`] // had signed cookies katjiblna lcookies
    if(!token) return res.status(401).json({message:" Not authenticated !"})
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        if(err) return res.status(401).json({message:"token expired"})
        console.log("token verified")


        // anxofo wax had token sal7 z3ma 
       const user= User.findById(userInfo.id)
       if(!user) return res.status(401).json({message:'not registered or token not functioned'})
       return res.status(200).json(userInfo)
       
    })
}