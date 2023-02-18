import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import { UserBody, LoginBody } from "../interfaces/IUser";
import { encryptPassword, matchPasswords } from "../helper/hashpasswords";
import jwt from 'jsonwebtoken';



export const getUsers = async (req: Request, res: Response) => {

    if (req.header('auth-token')) {
        try {
            const token:string | any = req.header('auth-token');
            const payload = jwt.verify(token, process.env["SECRET_KEY"] || '')
            console.log("this is the payload: ", payload);
            
            const user = await User.find();
            return res.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    } else{
        res.status(403).json({message: "you don't have access to see all users"})
    }
};

export const getUser = async (req: Request, res: Response) => {
    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const user = await User.findOneBy({ id: parseInt(id) });
    
            if (!user) return res.status(404).json({ message: "client not found" });
    
            return res.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access to see all users"})
    }
};

export const newUser = async (req: Request<unknown, unknown, UserBody>, res: Response) => {

    if (req.header('auth-token')) {
        try {
            const userBody = req.body;

            const existentEmail = await User.findOneBy({ email: userBody.email });
            if(existentEmail) return res.status(400).json({message: "email already exists"})

            const newPassword = await encryptPassword(userBody.password);

            userBody.password = newPassword;
            const userSaved = await User.save(userBody);

            res.status(200).json({ message: "user saved", user: userSaved })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    } else {
        res.status(401).json({ message: "your not authorized to see this place" })
    }
}

export const loginUser = async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    try {
        const loginBody = req.body;
        const { email, password } = loginBody;
        const userFound = await User.findOneBy({ email });
        if (userFound) {

            const match = await matchPasswords(password, userFound.password);
            if (match) {
                const token: string = jwt.sign({ id: userFound.id }, process.env['SECRET_KEY'] || '', {
                    expiresIn: 60 * 60 * 24
                });
                res.header('auth-token', token).status(200).json({ messsage: "login sucessfully" });
            } else {
                res.status(401).json({ message: "wrong credentials" });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const udpateUser = async(req: Request, res:Response) =>{
    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const user = await User.findOneBy({ id: parseInt(id) });
    
            if (!user) return res.status(404).json({ message: "client not found" });
            await User.update({id: parseInt(id)}, req.body);
            return res.status(204).json({message: "user updated successfully"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access to see all users"})
    }
}

export const deleteUser = async(req: Request, res:Response) => {
    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const user = await User.findOneBy({ id: parseInt(id) });
    
            if (!user) return res.status(404).json({ message: "client not found" });

            user.status = false;
            await User.update({id: parseInt(id)}, user);
            return res.status(204).json({message: "user deleted successfully"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access to see all users"})
    }
}
