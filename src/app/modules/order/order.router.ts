import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/', validateRequest(orderValidation.createOrderZodSchema), orderController.createOrder);
router.get('/', orderController.getAllOrder);

export const orderRouters = router;