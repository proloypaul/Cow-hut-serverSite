import { z } from "zod";
import { breedEnums, categoryEnums, labelEnums, loacationEnums } from "./cow.constraint";


const createCowZodSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: 'name is required',
      }),
      age: z.number({
        required_error: 'age is required',
      }),
      price: z.number({
        required_error: 'price is required',
      }),
      location: z.enum([...loacationEnums] as [string, ...string[]], {
        required_error: 'location is required',
      }),
      breed: z.enum([...breedEnums] as [string, ...string[]], {
        required_error: 'breed is required',
      }),
      weight: z.number({
        required_error: 'weight is required',
      }),
      label: z.enum([...labelEnums] as [string, ...string[]], {
        required_error: 'label is required',
      }),
      category: z.enum([...categoryEnums] as [string, ...string[]], {
        required_error: 'breed is required',
      }),
      seller: z.string({
        required_error: 'seller is required',
      }),

    }),
  });


const updateCowZodSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: 'name is required',
      }).optional(),
      age: z.number({
        required_error: 'age is required',
      }).optional(),
      price: z.number({
        required_error: 'price is required',
      }).optional(),
      location: z.enum([...loacationEnums] as [string, ...string[]], {
        required_error: 'location is required',
      }).optional(),
      breed: z.enum([...breedEnums] as [string, ...string[]], {
        required_error: 'breed is required',
      }).optional(),
      weight: z.number({
        required_error: 'weight is required',
      }).optional(),
      label: z.enum([...labelEnums] as [string, ...string[]], {
        required_error: 'label is required',
      }).optional(),
      category: z.enum([...categoryEnums] as [string, ...string[]], {
        required_error: 'breed is required',
      }).optional(),
      seller: z.string({
        required_error: 'seller is required',
      }).optional(),

    }),
  });

  export const cowValidataion = {
    createCowZodSchema,
    updateCowZodSchema
  }