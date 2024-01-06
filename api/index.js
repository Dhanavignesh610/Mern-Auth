import express from "express";
import mongoose from "mongoose"
import dotenv  from "dotenv"
import authRouter from "./routes/auth_routes.js";

dotenv.config()

const app = express()
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('Connected to MongoDB');
})
.catch( (err) => { 
    console.log(err); })

app.use(express.json());

app.listen(4000,console.log(`server is listening in 4000`))

app.get('/',(req,res) => {
 res.json({
    message:'API is working'
 })
})

app.use('/api/auth',authRouter)

app.use( (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({ 
       success:false,    
       message,
       statusCode
      }) 
   })