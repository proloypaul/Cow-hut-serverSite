import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { authValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();

router.post('/signup', validateRequest(userValidation.createUserZodSchema), UserControllers.createUser);
router.post('/login', validateRequest(authValidation.createLoginZodSchema), AuthControllers.loginUser);
router.post('/refresh-token', validateRequest(authValidation.refreshTokenZodSchema), AuthControllers.createRefreshToken);

export const authRouters = router;