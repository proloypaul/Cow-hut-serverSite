import { Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { UserServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { Iuser } from "./user.interface";
import { StatusCodes } from "http-status-codes";


const createUser = catchAsync(
    async (req: Request, res: Response) => {
        const {...userData} = req.body;
        // console.log("controller data", req.body)
        const result = await UserServices.createUserToDB(userData)
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: 'User data created successfully',
          data: result,
        });
        
      }
)

export const  UserControllers = {
    createUser,
}