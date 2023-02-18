
import { Router} from "express";

import {deleteAppartment, udpateAppartment,newAppartment, getAppartment, getAppartments } from "../controllers/appartment.controller";
const appartRouter:Router = Router();


appartRouter.get('/all_appartment', getAppartments);
appartRouter.get('/all_appartment/:id', getAppartment);
appartRouter.post('/new_appartment', newAppartment);
appartRouter.get('/update_appartment/:id', udpateAppartment);
appartRouter.get('/delete_appartment/:id', deleteAppartment);

export default appartRouter;
