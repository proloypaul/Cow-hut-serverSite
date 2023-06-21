import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Icow } from "./cow.interface";
import { StatusCodes } from "http-status-codes";
import { CowServices } from "./cow.service";
import pickFields from "../../shared/pickFields";
import { paginationFields } from "../../../constaint/paginationConstaint";

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

const getAllCow = catchAsync(
    async(req: Request, res: Response) => {
        const paginationOptions = pickFields(req.query, paginationFields);
        const filtersOptions = pickFields(req.query, ["searchTerm", "minPrice", "maxPrice", "location", "breed", "category"]);
        const result = await CowServices.getAllCowToDb(paginationOptions, filtersOptions);

        sendResponse<Icow[]>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Get cow successfully',
            meta: result.meta,
            data: result.data
        });
    }
)

const getSingleCow = catchAsync(
    async(req: Request, res: Response) => {
        const id = req.params.id;
        const result = await CowServices.getSingleCowToDB(id);

        sendResponse<Icow>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Get single cow successfully',
            data: result
        });
    }
)

const updateCow = catchAsync(
    async(req: Request, res: Response) => {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await CowServices.updateCowToDB(id, updatedData);

        sendResponse<Icow>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Get single cow successfully',
            data: result
        });
    }
)

const deleteCow = catchAsync(
    async(req: Request, res: Response) => {
        const id = req.params.id;
        const result = await CowServices.deleteCowToDB(id);

        sendResponse<Icow>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'deleted cow successfully',
            data: result
        });
    }
)


export const CowControllers = {
    createCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteCow
}