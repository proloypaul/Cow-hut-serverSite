import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IloginUserResponse } from "./auth.interface";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(
    async(req: Request, res: Response) => {
        const {...loginData} = req.body;
        const result = await AuthServices.loginUserToDB(loginData);

        sendResponse<IloginUserResponse>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Login user successfully',
            data: result
        });
    }
)

export const AuthControllers = {
    loginUser
}
