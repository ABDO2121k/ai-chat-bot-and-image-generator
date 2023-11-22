import  mongoose, { Schema } from "mongoose";
import {randomUUID} from 'crypto'


const chats= new Schema ({
     id:{
        type:String,
        default:randomUUID()
     },
     role:{
        type:String,
        required:true
     },
     content:{
            type:String,
            required:true
         }
     
})

const chatsI = new Schema({
    role:{
        type:String,
        required:true
     },
     content:{
            type:String,
            required:true
         }
})


const Users=new Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    chats:[chats],
    chatsI:[chatsI]
})

export default mongoose.model("User",Users)