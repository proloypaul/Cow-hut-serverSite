"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouters = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middelware/validationRequest"));
const user_validation_1 = require("../user/user.validation");
const user_controller_1 = require("../user/user.controller");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middelware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/signup', (0, validationRequest_1.default)(user_validation_1.userValidation.createUserZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserControllers.createUser);
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.authValidation.createLoginZodSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/refresh-token', (0, validationRequest_1.default)(auth_validation_1.authValidation.refreshTokenZodSchema), auth_controller_1.AuthControllers.createRefreshToken);
exports.authRouters = router;
