"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.number({
            required_error: 'phoneNumber is required'
        }),
        password: zod_1.z.string({
            required_error: 'passwrod is required'
        })
    })
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refreshToken is required',
        }),
    }),
});
exports.authValidation = {
    createLoginZodSchema,
    refreshTokenZodSchema
};
