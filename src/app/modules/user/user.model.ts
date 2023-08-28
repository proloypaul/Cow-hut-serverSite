import { Schema, model } from "mongoose";
import { Iuser, UserModel} from "./user.interface";


const userSchema = new Schema<Iuser, UserModel>(
    {
        phoneNumber: {type: Number, required: true, unique: true},
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

// using static method create two method isUserHere and isPasswordMatch
userSchema.statics.isUserHere = async function(
  phoneNumber:number
): Promise<Pick<Iuser, 'phoneNumber' | 'role' | 'password'> | null>{
  const user = await User.findOne({phoneNumber}, {id:1, password:1, role:1})
  
  return user 
}


export const User = model<Iuser, UserModel>(
    'User',
    userSchema
  );