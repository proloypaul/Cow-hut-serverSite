import { ILoginUser } from "./auth.interface";

const loginUserToDB = async(payload: ILoginUser):Promise<ILoginUser | null> => {
    const {phoneNumber, password} = payload;

    return null
}


export const AuthServices = {
    loginUserToDB
} 