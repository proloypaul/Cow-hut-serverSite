import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';
import auth from '../../middelware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post('/', validateRequest(orderValidation.createOrderZodSchema), auth(ENUM_USER_ROLE.BUYER), orderController.createOrder);
router.get('/:id', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), orderController.getSingleOrder)
router.get('/', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), orderController.getAllOrder);

export const orderRouters = router;