import { z } from "zod";

export const createAdminZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'phone number is required'
        }),
        role: z.enum(['admin'] as [string, ...string[]], {
            required_error: 'admin is required',
        }),
        password: z.string({
            required_error: 'password is required'
        }),
        name: z.object({
            firstName: z.string({
                required_error: 'first name is required'
            }),
            lastName: z.string({
                required_error: 'last name is required'
            })
        }),
        address: z.string({
            required_error: 'address is required'
        }) 
    })
})