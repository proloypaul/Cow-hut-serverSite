"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'ZodError',
        errorMessage: errors,
    };
};
exports.default = handleZodError;
