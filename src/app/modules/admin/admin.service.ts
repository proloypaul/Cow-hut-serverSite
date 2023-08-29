import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { Iadmin, IadminLogin } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IloginUserResponse } from "../auth/auth.interface";


const createAdminToDB = async(payload: Iadmin):Promise<Iadmin> => {
    const result = await Admin.create(payload);

    return result
}

// admin login
const adminLoginToDB = async(payload: IadminLogin): Promise<IloginUserResponse> => {
    const {phoneNumber, password} = payload;
    const isAdminExist = await Admin.isAdminHere(phoneNumber)

    if(!isAdminExist){
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin is not exist');
    }

    // check given and save password match or not
    if(isAdminExist?.password && !(await Admin.isPasswordMatched(password, isAdminExist?.password))){
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
    }

    

    const {role, phoneNumber:phone} = isAdminExist;
    // create access token with singined admin data
    const accessToken = jwtHelpers.createToken(
        {role, phone},
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    ) 

    const refreshToken = jwtHelpers.createToken(
        {role, phone},
        config.jwt.refresh_secrect as Secret,
        config.jwt.refresh_expires_in as string 
    )

    return {
        accessToken,
        refreshToken
    }
}

export const AdminService = {
    createAdminToDB,
    adminLoginToDB
}