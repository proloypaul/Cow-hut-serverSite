import { Schema, model } from "mongoose";
import { Iadmin, adminModel } from "./admin.interface";

const adminSchema = new Schema<Iadmin, adminModel>({
    password: {
        type: String,
        required: true,
        select: 0
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
        required: true,
        unique: true
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

// using static method create two method isAdminHere and isPasswordMatch
adminSchema.statics.isAdminHere = async function(
    phoneNumber:string
  ): Promise<Pick<Iadmin, 'password' | 'role' | 'phoneNumber'> | null>{
    const admin = await Admin.findOne({phoneNumber}, {phoneNumber:1, password:1, role:1})
    
    return admin
  }
  
  adminSchema.statics.isPasswordMatched = async function(
    givenPassword: string,
    savePassword: string
  ):Promise<boolean | null>{
    let isMatch = null
    if(givenPassword === savePassword){
        isMatch = true;
    }

    return isMatch
  }
export const Admin = model<Iadmin, adminModel>(
    'Admin',
    adminSchema
)