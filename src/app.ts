import express, {Application, Request, Response} from "express";
import morgan from "morgan";

// local imports
import authRoutes from "./routes/auth";
import userRouter from "./routes/userRoutes";


import { User } from "./entity/user.entity";
const app: Application = express();




// settings

app.set("port", 4000);


// midleware
app.use(morgan('dev'))
// defining routes
app.use(authRoutes);
app.use(userRouter);


// app.get("/all_users", async (req: Request, res:Response)=>{
//     const results = await AppDataSource.getRepository(User).find();
//     res.json(results)
// })

export default app;




// class App {

//     public express: express.Application;


//     constructor(){
//         this.express = express();
//         this.middleware();
//         this.routes();
//     }

//     private middleware():void{
//         this.express.use(morgan("dev"));
//     }

//     private routes(){
//         this.express.use(authRoutes);
//     }
// }
