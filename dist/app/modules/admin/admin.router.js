"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouters = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middelware/validationRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middelware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/create-admin', (0, validationRequest_1.default)(admin_validation_1.adminValidation.createAdminZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validationRequest_1.default)(admin_validation_1.adminValidation.adminLoginZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.adminLogin);
exports.adminRouters = router;
