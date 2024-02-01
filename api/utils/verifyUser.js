import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token || token === undefined){ 
        res.clearCookie('access_token'); // Clear the cookie
        return next(errorHandler(401,"emptyToken"))
    }
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{  
     if(err){ 
        return next(errorHandler(403,"expiredToken"))
     }
     req.user = user
    next()
    })
}