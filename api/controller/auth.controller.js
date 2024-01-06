import User from "../model/user_model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"
// const testapi = (req,res) => {
//     res.json({
//         message:'Test API is working'
//     })
// }

export const signup = async (req,res,next) => { 
  const { username, email, password} = req.body
  const hashPassword = bcrypt.hashSync(password,10)
  const newUser = new User ({username,email,password:hashPassword})

try {
    await newUser.save();
    res.status(201).json({message:"message is created successfully"})
} catch (error) {
  next(error)
}
}
