import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Iadmin } from "./admin.interface";
import { StatusCodes } from "http-status-codes";
import { AdminService } from "./admin.service";

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


export const AdminController = {
    createAdmin
}