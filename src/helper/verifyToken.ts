import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';



export interface IPayload{
    id: number;
    iat: number;
}

export const TokenValidation = (req: Request, 
    res:Response, next: NextFunction)=>{
        try{
            const token = req.header('token');
            if(!token) return res.status(403).json({message: "You don't have permissions to access to site"});
    
            const payload = jwt.verify(token, process.env["SECRET_KEY"] || '') as IPayload;
            console.log(payload);
            next();
        }catch(error){
            if (error instanceof Error){
                return res.status(404).json({message: "not found site"});
            }
        }
}
