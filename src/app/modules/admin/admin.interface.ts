import { Model } from "mongoose"

export type Iadmin = {
    password: string,
    role: "admin",
    name: {
        firstName: string,
        lastName: string
    },
    phoneNumber: string,
    address: string
}

export type adminModel = Model<Iadmin, Record<string, unknown>> 
