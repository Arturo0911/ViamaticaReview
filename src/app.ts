import express, {Application, Request, Response} from "express";
import morgan from "morgan";

// local imports
import authRoutes from "./routes/auth";
import userRouter from "./routes/userRoutes";
import appartRouter from "./routes/appartmentRoutes";
import cors from 'cors';

import { User } from "./entity/user.entity";
const app: Application = express();


// settings

app.set("port", 4000);


// midleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// defining routes
app.use(authRoutes);
app.use(userRouter);
app.use(appartRouter);


export default app;
