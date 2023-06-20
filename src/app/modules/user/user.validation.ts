import { z } from 'zod';

// req validation
const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.number({
        required_error: 'phoneNumber is required',
    }),

    role: z.enum(["seller", "buyer"],{
      required_error: 'role is required',
    }),
    password: z.string({
        required_error: 'password is required',
    }),
    name: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    address: z.string({
        required_error: 'address is required',
    }),
    budget: z.string({
        required_error: 'budget is required',
    }),
    income: z.string({
        required_error: 'income is required',
    })
  }),
});

export const userValidation = {
  createUserZodSchema,
};
