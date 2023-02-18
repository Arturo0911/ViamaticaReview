import { Router, Request, Response } from "express";
import { getUsers,newUser, getUser, deleteUser, udpateUser} from "../controllers/user.controllers";

const userRouter:Router = Router();

userRouter.get('/all_user', getUsers);
userRouter.get('/all_user/:id', getUser);
userRouter.post('/new_user', newUser);
userRouter.get('/update_user/:id', udpateUser);
userRouter.get('/delete_user/:id', deleteUser);

export default userRouter;
