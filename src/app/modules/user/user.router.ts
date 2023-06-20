import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post('/create-user',validateRequest(userValidation.createUserZodSchema), UserControllers.createUser);
router.get('/all-users', UserControllers.getAllUser);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', validateRequest(userValidation.updateUserZodSchema), UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);



export const userRouters = router