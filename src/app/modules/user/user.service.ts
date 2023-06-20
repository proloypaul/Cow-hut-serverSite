import { Iuser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async(payload:Iuser) => {
    // console.log("data come from service", payload)
    const result = await User.create(payload);

    return result;
}

export const UserServices = {
    createUserToDB,
}