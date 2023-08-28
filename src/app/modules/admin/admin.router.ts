import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { adminValidation, createAdminZodSchema } from './admin.validation';
import { AdminController } from './admin.controller';


const router = express.Router();

router.post('/create-admin', validateRequest(adminValidation.createAdminZodSchema), AdminController.createAdmin);

export const adminRouters = router;