"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouters = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middelware/validationRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middelware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(order_validation_1.orderValidation.createOrderZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER), order_controller_1.orderController.createOrder);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getSingleOrder);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getAllOrder);
exports.orderRouters = router;
