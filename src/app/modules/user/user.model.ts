import { Schema, model } from "mongoose";
import { Iuser, userModel } from "./user.interface";


const userSchema = new Schema<Iuser>(
    {
        phoneNumber: {type: Number, required: true},
        role: {type: String, required: true, enum: ['seller', 'buyer']  },
        password: {type: String, required: true},
        name: {
            firstName: {type: String, required:true},
            lastName: {type: String, required:true}
        },
        address: {type: String, required:true},
        budget: {type: String, required:true},
        income: {type: String, required:true}
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );

export const User = model<Iuser, userModel>(
    'User',
    userSchema
  );