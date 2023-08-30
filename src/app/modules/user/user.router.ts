import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middelware/validationRequest';
import { userValidation } from './user.validation';
import auth from '../../middelware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

// user updated route
router.get('/my-profile', auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER), UserControllers.getMyProfile);
// router.patch('/my-profile', UserControllers.update)
// user route
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getSingleUser);
router.patch('/:id', validateRequest(userValidation.updateUserZodSchema), auth(ENUM_USER_ROLE.ADMIN), UserControllers.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUserData);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getAllUser);

export const userRouters = router