import { Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { UserServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { Iuser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import pickFields from "../../shared/pickFields";
import { paginationFields } from "../../../constaint/paginationConstaint";


const createUser = catchAsync(
    async (req: Request, res: Response) => {
        const {...userData} = req.body;
        // console.log("controller data", req.body)
        const result = await UserServices.createUserToDB(userData)
        sendResponse<Iuser>(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: 'User data created successfully',
          data: result,
        });
        
      }
)

const getAllUser = catchAsync(
    async (req: Request, res: Response) => {
        const paginationOptions = pickFields(req.query, paginationFields);
        const result = await UserServices.getAllUserToDB(paginationOptions);

        sendResponse<Iuser[]>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Get user all data successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)

const getSingleUser = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await UserServices.getSingleUserToDB(id);

        sendResponse<Iuser>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Get single user data successfully',
            data: result
        });
    }
)

export const  UserControllers = {
    createUser,
    getAllUser,
    getSingleUser
}