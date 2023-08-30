"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validationRequest_1 = __importDefault(require("../../middelware/validationRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middelware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
// user updated route
router.get('/my-profile', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.BUYER), user_controller_1.UserControllers.getMyProfile);
// router.patch('/my-profile', UserControllers.update)
// user route
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserControllers.getSingleUser);
router.patch('/:id', (0, validationRequest_1.default)(user_validation_1.userValidation.updateUserZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserControllers.updateUser);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserControllers.deleteUserData);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserControllers.getAllUser);
exports.userRouters = router;
