import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Icow } from "./cow.interface";
import { StatusCodes } from "http-status-codes";
import { CowServices } from "./cow.service";

const createCow = catchAsync(
    async(req: Request, res: Response) => {
        const {...cowData} = req.body;
        const result = await CowServices.createCowToDB(cowData);

        sendResponse<Icow>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Create cow successfully',
            data: result
        });
    }
)

export const CowControllers = {
    createCow
}