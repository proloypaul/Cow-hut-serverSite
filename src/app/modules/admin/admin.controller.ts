import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Iadmin } from "./admin.interface";
import { StatusCodes } from "http-status-codes";
import { AdminService } from "./admin.service";
import { IloginUserResponse } from "../auth/auth.interface";
import config from "../../../config";

const createAdmin = catchAsync(
    async(req: Request, res: Response) => {
        const {...adminData} = req.body
        const result = await AdminService.createAdminToDB(adminData)
        sendResponse<Iadmin>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Create admin successfully',
            data: result
        });
    }
)

// admin login
const adminLogin = catchAsync(
    async(req: Request, res: Response) => {
        const {...adminLoginData} = req.body
        const result = await AdminService.adminLoginToDB(adminLoginData);

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
            message: 'Admin login successfully',
            data: others
        });
    }
)


export const AdminController = {
    createAdmin,
    adminLogin
}