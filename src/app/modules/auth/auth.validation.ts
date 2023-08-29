import { z } from "zod";

const createLoginZodSchema = z.object({
    body: z.object({
        phoneNumber: z.number({
            required_error: 'phoneNumber is required'
        }),
        password: z.string({
            required_error: 'passwrod is required'
        })
    })
}) 

const refreshTokenZodSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'refreshToken is required',
      }),
    }),
  });

export const authValidation = {
    createLoginZodSchema,
    refreshTokenZodSchema
}