import express from 'express';
import { CowControllers } from './cow.controller';
import validateRequest from '../../middelware/validationRequest';
import { cowValidataion } from './cow.validation';

const router = express.Router();

router.post('/create-cow', validateRequest(cowValidataion.createCowZodSchema), CowControllers.createCow);
router.get('/getSingle-cow/:id', CowControllers.getSingleCow);
router.patch('/update-cow/:id', validateRequest(cowValidataion.updateCowZodSchema), CowControllers.updateCow)
router.delete('/delete-cow/:id', CowControllers.deleteCow);
router.get("/get-allCow", CowControllers.getAllCow);

export const cowRouters = router;