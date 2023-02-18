import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import { UserBody } from "interfaces/IUser";
import { encryptPassword } from "../helper/hashpasswords";




export const getUsers = async(req:Request, res:Response)=>{
    try{
        const user = await User.find();
        return res.status(200).json(user)
    }catch(error){
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
};

export const getUser = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const user = await User.findOneBy({id: parseInt(id)});
        
        if (!user) return res.status(404).json({message: "client not found"});
        
        return res.status(200).json(user)
    }catch(error){
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
};


export const newUser = async(req:Request<unknown, unknown, UserBody>, res:Response)=>{
    try{
        const userBody = req.body;
        const newPassword = await encryptPassword(userBody.password);

        userBody.password = newPassword;
        await User.save(userBody);

        console.log(userBody);
        res.status(200).json({message:"user saved"})

    }catch(error){
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}
