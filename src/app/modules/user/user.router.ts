import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();


router.post('/create-user',validateRequest(userValidation.createUserZodSchema), UserControllers.createUser);
router.get('/getSingle-user/:id', UserControllers.getSingleUser);
router.patch('/update-user/:id', validateRequest(userValidation.updateUserZodSchema), UserControllers.updateUser);
router.delete('/delete-user/:id', UserControllers.deleteUserData);
router.get('/all-users', UserControllers.getAllUser);

export const userRouters = router