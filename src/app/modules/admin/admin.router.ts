import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { createAdminZodSchema } from './admin.validation';
import { AdminController } from './admin.controller';


const router = express.Router();

router.post('/create-admin', validateRequest(createAdminZodSchema), AdminController.createAdmin);

export const adminRouters = router;