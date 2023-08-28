import { Schema, model } from "mongoose";
import { Iorder, orderModel } from "./order.interface";

const orderSchema = new Schema<Iorder, orderModel>({
    cow: {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
} 

)

export const Order = model<Iorder, orderModel>(
    'Order',
    orderSchema
)