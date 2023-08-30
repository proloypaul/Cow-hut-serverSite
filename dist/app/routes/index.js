"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const cow_router_1 = require("../modules/cow/cow.router");
const auth_router_1 = require("../modules/auth/auth.router");
const order_router_1 = require("../modules/order/order.router");
const admin_router_1 = require("../modules/admin/admin.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_router_1.userRouters,
    },
    {
        path: '/cows',
        route: cow_router_1.cowRouters,
    },
    {
        path: '/auth',
        route: auth_router_1.authRouters,
    },
    {
        path: '/order',
        route: order_router_1.orderRouters,
    },
    {
        path: '/admins',
        route: admin_router_1.adminRouters,
    },
];
moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
exports.default = router;
