import { Model, Types } from "mongoose";
import { Iuser } from "../user/user.interface";

export type IlocationEnums = "Dhaka" | "Chattogram" | "Barishal" | "Rajshahi" | "Sylhet" |"Comilla"|"Rangpur"|"Mymensingh";

export type IbreedEnums = "Brahman" | "Nellore" | "Sahiwal" | "Gir" | "Indigenous" |"Tharparkar"|"KanKrej";

export type IlabelEnums = "for sale" | "sold out";

export type IcategoryEnums = "Dairy" | "Beef" | "DualPurpose"  

export type Icow = {
    name: string,
    age: number,
    price: number,
    location: IlocationEnums,
    breed: IbreedEnums,
    weight: number,
    label: IlabelEnums,
    category: IcategoryEnums,
    seller: Types.ObjectId | Iuser
}

export type cowModel = Model<
  Icow,
  Record<string, unknown>
>;
