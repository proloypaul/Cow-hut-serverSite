"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
// global error handler  in production environment
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'some thing went wrong';
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) == 'ValidationError') {
        const simplefieError = (0, handleValidationError_1.default)(error);
        statusCode = simplefieError.statusCode;
        message = simplefieError.message;
        errorMessage = simplefieError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplefieError = (0, handleZodError_1.default)(error);
        statusCode = simplefieError.statusCode;
        message = simplefieError.message;
        errorMessage = simplefieError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        // res.status(200).json({ error });
        const simplefileError = (0, handleCastError_1.default)(error);
        statusCode = simplefileError.statusCode;
        message = simplefileError.message;
        errorMessage = simplefileError.errorMessage;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stact: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    res.status(400).json({ error: error });
    next();
};
exports.default = globalErrorHandler;
