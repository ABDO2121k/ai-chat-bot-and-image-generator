
import OpenAI, { OpenAIApi } from 'openai'
// import { openaiC } from '../config/openai.js'
import User from '../models/User.js'
import { openaiC } from '../config/openai.js';
// import jwt from 'jsonwebtoken'


// export const newChat= async (req,res)=>{ 
//     // verifie token
//     const token =req.signedCookies[`${process.env.COOKIE_NAME}`] // had signed cookies katjiblna lcookies
//     if(!token) return res.status(401).json({message:" Not authenticated !"})
//     jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
//         if(err) return res.status(401).json({message:"token expired"})
//         console.log("token verified")
//         // anbdaw 
//         const {message}=req.body;
//         const user=  User.findById(userInfo.id)
//         if(!user) return res.status(401).json({message:'not registered or token not functioned'})
//          try{
//              // njibo chat dialo ila knt 3ndo
//         const chats=user.chats.map(({role,content})=>({role,content}))
//         chats.push({content:message,role:"user"})
//         user.chats.push({content:message,role:"user"})
//         // nsifto chats l openai
//         const config=openaiC()
//         const openai=new OpenAIApi(config)
//         const chatRes= openai.createChatCompletion({model:"gpt-3.5-turbo",messages:chats})
//         user.chats.push(chatRes.data.choices[0].message)
//          user.save()
//          return res.status(200).json({chats:user.chats})
//          }catch(err){
//             console.log(err)
//             return res.status(500).json({message:"ERROR",cause:err.message})
//          }
//     })
// }







export const generatChat=async(req,res)=>{
         const{message}=req.body;
         console.log(res.locals.jwtData)
         const user=await User.findById(res.locals.jwtData.id)
         if(!user) return res.status(401).json({message:'not registered or token not functioned'})
         try{
            
         const chats=user.chats.map(({role,content})=>({role,content}))
        chats.push({content:message,role:"user"})
        user.chats.push({content:message,role:"user"})
        // nsifto chats l openai

        //openai jdida:
        // const openai=new OpenAI({apiKey:process.env.OPEN_AI_SECRET})
        // const completion = await openai.chat.completions.create({
        //     messages: [{ role: "system", content: chats}],
        //     model: "gpt-3.5-turbo",
        //   });   
        
        // openai l9dima  
        const config=openaiC()
        const openai= new OpenAIApi(config)
        console.log("chats ",chats)
        const chatRes= await openai.createChatCompletion({model:"gpt-3.5-turbo",messages:chats})
        console.log(chatRes)
         await user.chats.push(chatRes.data.choices[0].message)
                 user.save()
                 return res.status(200).json({chats:user.chats})
         }catch(error){
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
              } else {
                console.log(error.message);
              }
            return res.status(500).json({message:"ERROR",cause:error.message})
         }
}


export const getChat=async (req,res)=>{
      try{
        const user=await User.findById(res.locals.jwtData.id)
        if(!user) return res.status(401).json({message:'not registered or token not functioned'})
        return res.status(200).json({message:"success",chats:user.chats})
      }catch(err){
        console.log(err)
        return res.status(500).json({message:"ERROR",cause:err.message})
      }
}


export const clearChat=async(req,res)=>{
  try{
    const user=await User.findById(res.locals.jwtData.id)
    if(!user) return res.status(401).json({message:'not registered or token not functioned'})
    user.chats=[]
    user.save()
    return res.status(200).json({message:"success"})
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"ERROR",cause:err.message})
  }
}


