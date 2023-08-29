import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { adminValidation } from './admin.validation';
import { AdminController } from './admin.controller';


const router = express.Router();

router.post('/create-admin', validateRequest(adminValidation.createAdminZodSchema), AdminController.createAdmin);
router.post('/login', validateRequest(adminValidation.adminLoginZodSchema), AdminController.adminLogin);

export const adminRouters = router;