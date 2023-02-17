import { Router, Request, Response } from "express";
import getAllUsers  from "../helper/UserQueries";

const userRouter:Router = Router();

userRouter.get('/all_user', (req:Request, res:Response)=>{
    res.send(getAllUsers());
});

export default userRouter;
