import jwt from 'jsonwebtoken'


export const verify=async (req,res,next)=>{
       // verifie token
       const token =req.signedCookies[`${process.env.COOKIE_NAME}`] // had signed cookies katjiblna lcookies
       if(!token) return res.status(401).json({message:" Not authenticated !"})
       jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
           if(err) return res.status(401).json({message:"token expired"})
           console.log("token verified")
           res.locals.jwtData=userInfo
           return next()
       })
}