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

const updateUser = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await UserServices.updateUserToDB(id, updatedData);

        sendResponse<Iuser>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'user updated successfully',
            data: result
        });
    }
)

const deleteUserData = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await UserServices.deleteUserToDB(id);
        sendResponse<Iuser>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'user deleted successfully',
            data: result
        });
    }
)

// get update my profile 
const getMyProfile = catchAsync(
    async (req: Request, res: Response) => {
        const token:string = req.headers.authorization as string;

        const result = await UserServices.getMyProfileToDB(token);

        // const {role, ...displayData} = result 
        sendResponse<Partial<Iuser>>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'my profile data get successfully',
            data: result
        });
    }
)


export const  UserControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUserData,
    getMyProfile
}