"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middelware/globalErrorHandler"));
const app = (0, express_1.default)();
//parse
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// router 
app.use('/api/v1', routes_1.default);
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.default);
exports.default = app;
