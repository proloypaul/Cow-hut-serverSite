import { Model, Types } from "mongoose";
import { Iuser } from "../user/user.interface";
import { Icow } from "../cow/cow.interface";

export type Iorder = {
    cow: Types.ObjectId | Icow,
    buyer: Types.ObjectId | Iuser 
}

export type orderModel = Model<
Iorder,
Record<string, unknown>
>

export type IbuyerUpdatedData = {
    "budget": string
}

export type IcowUpdateData = {
    "label": string
}

export interface Seller {
    id: string;
    income: string;
  }
  
export interface CowData {
    seller: Seller | null;
  }

// collect my assingment repository from another account 