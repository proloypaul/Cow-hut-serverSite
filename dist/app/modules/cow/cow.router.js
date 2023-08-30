"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRouters = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const validationRequest_1 = __importDefault(require("../../middelware/validationRequest"));
const cow_validation_1 = require("./cow.validation");
const auth_1 = __importDefault(require("../../middelware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(cow_validation_1.cowValidataion.createCowZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowControllers.createCow);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.CowControllers.getSingleCow);
router.patch('/:id', (0, validationRequest_1.default)(cow_validation_1.cowValidataion.updateCowZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowControllers.updateCow);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowControllers.deleteCow);
router.get("/", (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.CowControllers.getAllCow);
exports.cowRouters = router;
