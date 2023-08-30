"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// req validation
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.number({
            required_error: 'phoneNumber is required',
        }),
        role: zod_1.z.enum(["seller", "buyer"], {
            required_error: 'role is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string()
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        budget: zod_1.z.string({
            required_error: 'budget is required',
        }),
        income: zod_1.z.string({
            required_error: 'income is required',
        })
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.number({
            required_error: 'phoneNumber is required',
        }).optional(),
        role: zod_1.z.enum(["seller", "buyer"], {
            required_error: 'role is required',
        }).optional(),
        password: zod_1.z.string({
            required_error: 'password is required',
        }).optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string()
        }).optional(),
        address: zod_1.z.string({
            required_error: 'address is required',
        }).optional(),
        budget: zod_1.z.string({
            required_error: 'budget is required',
        }).optional(),
        income: zod_1.z.string({
            required_error: 'income is required',
        }).optional()
    }),
});
exports.userValidation = {
    createUserZodSchema,
    updateUserZodSchema
};
