import { Schema, model } from "mongoose";
import { Iuser, UserModel} from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";


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
        budget: {type: String, required:true, default: '0'},
        income: {type: String, required:true, default: '0'}
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );


// hashing user password
userSchema.pre('save', async function(next){
  const user = this;
  user.password = await bcrypt.hash(
    user.password, 
    Number(config.bcrypt_salt_rounds)
  )

  next()
})

// using static method create two method isUserHere and isPasswordMatch
userSchema.statics.isUserHere = async function(
  phoneNumber:number
): Promise<Pick<Iuser, 'phoneNumber' | 'role' | 'password' | 'id'> | null>{
  const user = await User.findOne({phoneNumber}, {id:1, password:1, role:1})
  
  return user 
}

userSchema.statics.isPasswordMatched = async function(
  givenPassword: string,
  savePassword: string
):Promise<boolean>{
  const isMatch = await bcrypt.compare(givenPassword, savePassword);
  return isMatch
}


export const User = model<Iuser, UserModel>(
    'User',
    userSchema
  );