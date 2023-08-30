"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'phone number is required'
        }),
        role: zod_1.z.enum(['admin'], {
            required_error: 'admin is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required'
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'first name is required'
            }),
            lastName: zod_1.z.string({}).optional()
        }),
        address: zod_1.z.string({
            required_error: 'address is required'
        })
    })
});
const adminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'phone number is required'
        }),
        password: zod_1.z.string({
            required_error: 'password is required'
        })
    })
});
exports.adminValidation = {
    createAdminZodSchema,
    adminLoginZodSchema
};
