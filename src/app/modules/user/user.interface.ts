import { Model } from "mongoose";

export type Iuser = {
    phoneNumber: number,
    role: 'seller' | 'buyer',
    password: string,
    name: {
        firstName: string,
        lastName: string,
    },
    address: string,
    budget: string,
    income: string,

}


export type UserModel = {
  isUserHere(
    phoneNumber: number
  ): Promise<Pick<Iuser, 'phoneNumber' | 'role' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<Iuser>;


