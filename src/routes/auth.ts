import {Router, Request, Response} from 'express';

import { loginUser } from '../controllers/user.controllers';

const router: Router = Router();


router.post('/auth',loginUser);

export default router;
