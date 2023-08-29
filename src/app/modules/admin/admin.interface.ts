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

export type IadminLogin = {
    phoneNumber: string,
    password: string
}

export type adminModel = {
    isAdminHere(
        phoneNumber: string
      ): Promise<Pick<Iadmin, 'password' | 'role' | 'phoneNumber'>>;
    isPasswordMatched(
    givenPassword: string,
    savePassword: string
    ): Promise<boolean>;
} & Model<Iadmin> 

