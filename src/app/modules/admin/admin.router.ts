import express from 'express';
import validateRequest from '../../middelware/validationRequest';
import { adminValidation } from './admin.validation';
import { AdminController } from './admin.controller';
import auth from '../../middelware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';


const router = express.Router();

router.post('/create-admin', validateRequest(adminValidation.createAdminZodSchema), auth(ENUM_USER_ROLE.ADMIN), AdminController.createAdmin);
router.post('/login', validateRequest(adminValidation.adminLoginZodSchema), auth(ENUM_USER_ROLE.ADMIN),  AdminController.adminLogin);

export const adminRouters = router;