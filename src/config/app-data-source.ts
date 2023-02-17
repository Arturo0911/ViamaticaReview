import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arthur",
    password: "arturo_root",
    database: "viamaticareview",
    synchronize: true,
    logging: true,
    //entities: [Post, Category],
    entities:["../src/entity/*.js"],
    subscribers: [],
    migrations: [],
})
