import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

// user updated route
router.get('/my-profile', UserControllers.getMyProfile);
// router.patch('/my-profile', UserControllers.update)
// user route
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', validateRequest(userValidation.updateUserZodSchema), UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUserData);
router.get('/', UserControllers.getAllUser);

export const userRouters = router