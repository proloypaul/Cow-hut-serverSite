import express from 'express';
import { CowControllers } from './cow.controller';
import validateRequest from '../../middelware/validationRequest';
import { cowValidataion } from './cow.validation';
import auth from '../../middelware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post('/', validateRequest(cowValidataion.createCowZodSchema), auth(ENUM_USER_ROLE.SELLER), CowControllers.createCow);
router.get('/:id', auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowControllers.getSingleCow);
router.patch('/:id', validateRequest(cowValidataion.updateCowZodSchema), auth(ENUM_USER_ROLE.SELLER), CowControllers.updateCow)
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowControllers.deleteCow);
router.get("/", auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowControllers.getAllCow);

export const cowRouters = router;