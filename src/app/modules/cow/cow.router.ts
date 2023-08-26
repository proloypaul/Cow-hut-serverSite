import express from 'express';
import { CowControllers } from './cow.controller';
import validateRequest from '../../middelware/validationRequest';
import { cowValidataion } from './cow.validation';

const router = express.Router();

router.post('/', validateRequest(cowValidataion.createCowZodSchema), CowControllers.createCow);
router.get('/:id', CowControllers.getSingleCow);
router.patch('/:id', validateRequest(cowValidataion.updateCowZodSchema), CowControllers.updateCow)
router.delete('/:id', CowControllers.deleteCow);
router.get("/", CowControllers.getAllCow);

export const cowRouters = router;