import { Schema, model } from "mongoose";
import { Iadmin, adminModel } from "./admin.interface";

const adminSchema = new Schema<Iadmin>({
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin']
    },
    name: {
        firstName: {type: String, required:true},
        lastName: {type: String}
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}
)

const Admin = model<Iadmin, adminModel>(
    'Admin',
    adminSchema
)