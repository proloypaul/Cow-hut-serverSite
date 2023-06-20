import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post('/create-user',validateRequest(userValidation.createUserZodSchema), UserControllers.createUser);
router.get('/:id', UserControllers.getSingleUser);


router.get('/all-users', UserControllers.getAllUser);





export const userRouters = router