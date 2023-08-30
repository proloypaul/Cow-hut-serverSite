"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCasrError = (error) => {
    const errors = [
        {
            path: error.path,
            message: `Invalid ${error.path}`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'CastError',
        errorMessage: errors,
    };
};
exports.default = handleCasrError;
