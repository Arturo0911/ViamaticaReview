import express, {Application} from "express";
import morgan from "morgan";

// local imports
import authRoutes from "./routes/auth";

const app: Application = express();


// settings

app.set("port", 4000);


// midleware
app.use(morgan('dev'))
// defining routes
app.use(authRoutes);

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
