
import app from "./app";
import { AppDataSource } from './config/app-data-source';
import dotenv from 'dotenv';
dotenv.config();

AppDataSource
    .initialize()
    .then(async () => {
        console.log("Datasource has been initiliazed");
        //const user = new User();
    })
    .catch((err) => console.log("Error by: ", err));

function main() {
    app.listen(app.get("port"));
    console.log("working in the port 4000");
}

main()

