import { Schema, model } from "mongoose";
import { Icow, cowModel } from "./cow.interface";
import { breedEnums, categoryEnums, labelEnums, loacationEnums } from "./cow.constraint";



const cowSchema = new Schema<Icow, cowModel>(
    {
        name: {type: String, required:true},
        age: {type: Number, required:true},
        price: {type: Number, required: true},
        location: {type: String, required: true, enum: loacationEnums},
        breed: {type: String, required: true, enum: breedEnums},
        weight: {type: Number, required: true},
        label: {type: String, required: true, enum: labelEnums, default: "for sale"},
        category: {type: String, required: true, enum: categoryEnums},
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        } 
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );

export const Cow = model<Icow, cowModel>(
    'Cow',
    cowSchema
  );