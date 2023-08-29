import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IloginUserResponse } from "./auth.interface";
import { AuthServices } from "./auth.service";
import config from "../../../config";

const loginUser = catchAsync(
    async(req: Request, res: Response) => {
        const {...loginData} = req.body;
        const result = await AuthServices.loginUserToDB(loginData);

        const {refreshToken, ...others} = result

        // set refreshToken to our cookies
        const cookieOptions = {
            secure: config.env === 'production',
            httpOnly: true,
          };
        res.cookie('refreshToken', refreshToken, cookieOptions)

        sendResponse<IloginUserResponse>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Login user successfully',
            data: others
        });
    }
)
const createRefreshToken = catchAsync(
    async(req: Request, res: Response) => {
        console.log("cookies value", req.cookies)
        const { refreshToken } = req.cookies;
        console.log('refreshToken', refreshToken);

        const result = await AuthServices.createNewAccessToken(refreshToken);

        sendResponse<IloginUserResponse>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'New access token create succefully',
            data: result
        });
    }
)

export const AuthControllers = {
    loginUser,
    createRefreshToken
}
