import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { User } from "../user/user.model";
import { ILoginUser, IloginUserResponse } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


const loginUserToDB = async(payload: ILoginUser):Promise<IloginUserResponse> => {
    const {phoneNumber, password} = payload;
    const phoneStringToNum = parseInt(phoneNumber);
    const isUserExist = await User.isUserHere(phoneStringToNum);

    if(!isUserExist){
        throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
    }

    if(isUserExist?.password && !(await User.isPasswordMatched(password, isUserExist?.password))){
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
    }

    const {id, role, phoneNumber:phone} = isUserExist;
    // create access token with singined user data
    const accessToken = jwtHelpers.createToken(
        {id, role, phone},
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    ) 

    const refreshToken = jwtHelpers.createToken(
        {id, role, phone},
        config.jwt.refresh_secrect as Secret,
        config.jwt.refresh_expires_in as string 
    )

    return {
        accessToken,
        refreshToken, 
    }
}


export const AuthServices = {
    loginUserToDB
} 