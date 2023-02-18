import "reflect-metadata";
import { User } from "../entity/user.entity"
import {Appartment} from "../entity/appartment.entity";
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "<your password>",
    database: "viamaticareview",
    synchronize: true,
    logging: true,
    //entities: [Post, Category],
    entities:[User, Appartment],
    subscribers: [],
    migrations: [],
})
