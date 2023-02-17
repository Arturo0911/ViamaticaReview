import { User } from "../entity/user.entity"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "arturo_root",
    database: "viamaticareview",
    synchronize: true,
    logging: true,
    //entities: [Post, Category],
    entities:[User],
    subscribers: [],
    migrations: [],
})
