import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectDB } from './ConnectDB.js'
import appRouter from './router/index.js'

dotenv.config()

const app=express()
connectDB()


app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan("dev"))// katdir console .log l http request fiha lm3lomat get lw9t....
// kat7iyd f production


app.use("/api",appRouter)


app.listen(process.env.PORT?process.env.PORT:5000,()=>{
    console.log("connected in port 8000")
})