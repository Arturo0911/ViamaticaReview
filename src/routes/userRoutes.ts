import { Router, Request, Response } from "express";
import { getUsers,newUser, getUser} from "../controllers/user.controllers";

const userRouter:Router = Router();

userRouter.get('/all_user', getUsers);
userRouter.get('/all_user/:id', getUser);
userRouter.post('/new_user', newUser);

export default userRouter;
