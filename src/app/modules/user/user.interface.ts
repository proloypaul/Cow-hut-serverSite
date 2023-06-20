import { Model } from "mongoose";

export type Iuser = {
    phoneNumber: number,
    role: 'seller' | 'buyer',
    password: number,
    name: {
        firstName: string,
        lastName: string,
    },
    address: string,
    budget: string,
    income: string,

}

export type userModel = Model<
  Iuser,
  Record<string, unknown>
>;

