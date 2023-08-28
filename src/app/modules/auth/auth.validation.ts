import { z } from "zod";

export const createLoginZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'phoneNumber is required'
        }),
        password: z.string({
            required_error: 'passwrod is required'
        })
    })
}) 

export const authValidation = {
    createLoginZodSchema
}