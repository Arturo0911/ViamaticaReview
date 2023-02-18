import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import { UserBody, LoginBody } from "../interfaces/IUser";
import { encryptPassword, matchPasswords } from "../helper/hashpasswords";
import jwt from 'jsonwebtoken';



export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        return res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getUser = async (req: Request, res: Response) => {
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
};


export const newUser = async (req: Request<unknown, unknown, UserBody>, res: Response) => {
    try {
        const userBody = req.body;
        const newPassword = await encryptPassword(userBody.password);

        userBody.password = newPassword;
        const userSaved = await User.save(userBody);

        // Here is where the token user will be created...
        const token: string = jwt.sign({id: userSaved.id}, process.env['SECRET_KEY'] || '');


        res.status(200).json({ message: "user saved", token: token })

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
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
                res.status(200).json({messsage: "login sucessfully"});
            } else {
                res.status(401).json({message: "wrong credentials"});
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
