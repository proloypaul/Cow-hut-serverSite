import express from 'express';
import { CowControllers } from './cow.controller';

const router = express.Router();

router.post('/create-cow', CowControllers.createCow);
router.get('/getSingle-cow/:id', CowControllers.getSingleCow);
router.delete('/delete-cow/:id', CowControllers.deleteCow);

export const cowRouters = router;