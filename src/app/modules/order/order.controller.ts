import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Iorder } from "./order.interface";
import { StatusCodes } from "http-status-codes";
import { orderService } from "./order.service";

const createOrder = catchAsync(
    async(req: Request, res: Response) => {
        const {...orderData} = req.body;
        const result = await orderService.createOrderToDB(orderData)

        sendResponse<Iorder>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Create Order successfully',
            data: result
        });
    }
) 

const getAllOrder = catchAsync(
    async(req: Request, res: Response) => {
        const result = await orderService.getAllOrderToDB();

        sendResponse<Iorder[]>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Get order successfully",
            data: result
        })
    }
)
const getSingleOrder = catchAsync(
    async(req: Request, res: Response) => {
        const orderId = req.params.id;

        const result = await orderService.getSingleOrderToDB(orderId);

        sendResponse<Iorder>(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Get single order successfully",
            data: result
        })
    }
)

export const orderController = {
    createOrder,
    getAllOrder,
    getSingleOrder
}