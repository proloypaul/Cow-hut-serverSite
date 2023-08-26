import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';


const router = express.Router();

router.post('/signup', validateRequest(userValidation.createUserZodSchema), UserControllers.createUser);

export const authRouters = router;