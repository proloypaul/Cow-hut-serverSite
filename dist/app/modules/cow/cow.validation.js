"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowValidataion = void 0;
const zod_1 = require("zod");
const cow_constraint_1 = require("./cow.constraint");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        age: zod_1.z.number({
            required_error: 'age is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        location: zod_1.z.enum([...cow_constraint_1.loacationEnums], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.enum([...cow_constraint_1.breedEnums], {
            required_error: 'breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'weight is required',
        }),
        label: zod_1.z.enum([...cow_constraint_1.labelEnums], {
            required_error: 'label is required',
        }),
        category: zod_1.z.enum([...cow_constraint_1.categoryEnums], {
            required_error: 'breed is required',
        }),
        seller: zod_1.z.string({
            required_error: 'seller is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }).optional(),
        age: zod_1.z.number({
            required_error: 'age is required',
        }).optional(),
        price: zod_1.z.number({
            required_error: 'price is required',
        }).optional(),
        location: zod_1.z.enum([...cow_constraint_1.loacationEnums], {
            required_error: 'location is required',
        }).optional(),
        breed: zod_1.z.enum([...cow_constraint_1.breedEnums], {
            required_error: 'breed is required',
        }).optional(),
        weight: zod_1.z.number({
            required_error: 'weight is required',
        }).optional(),
        label: zod_1.z.enum([...cow_constraint_1.labelEnums], {
            required_error: 'label is required',
        }).optional(),
        category: zod_1.z.enum([...cow_constraint_1.categoryEnums], {
            required_error: 'breed is required',
        }).optional(),
        seller: zod_1.z.string({
            required_error: 'seller is required',
        }).optional(),
    }),
});
exports.cowValidataion = {
    createCowZodSchema,
    updateCowZodSchema
};
