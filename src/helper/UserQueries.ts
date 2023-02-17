// Database initializing
import { User } from '../entity/user.entity';
import {AppDataSource} from '../config/app-data-source';
AppDataSource
    .initialize()
    .then(async()=>{
        console.log("Datasource has been initiliazed");
        //const user = new User();
    })
    .catch((err)=>console.log("Error by: ",err))



const getAllUsers =  async()=>{
    const results = await AppDataSource.getRepository(User);
    return results;
}


export default getAllUsers;
