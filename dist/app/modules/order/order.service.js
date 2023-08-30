"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrderToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { cow: cowId, buyer: buyerId } = orderData;
    // collect buyer data using buyer id 
    const buyerData = yield user_model_1.User.findById(buyerId);
    // collect cow data using cow id
    const cowData = yield cow_model_1.Cow.findById(cowId).populate("seller");
    // if buyer budget is enough to buy the cow then cow label, buyer budget and seller income will be updated 
    if (parseInt(buyerData === null || buyerData === void 0 ? void 0 : buyerData.budget) >= (cowData === null || cowData === void 0 ? void 0 : cowData.price) && (cowData === null || cowData === void 0 ? void 0 : cowData.label) === "for sale") {
        // console.log("Wow we can buy the Cow " + buyerData?.budget+ " " + cowData?.price);
        const afterBuyingCow = parseInt(buyerData === null || buyerData === void 0 ? void 0 : buyerData.budget) - (cowData === null || cowData === void 0 ? void 0 : cowData.price);
        const buyerUpdatedData = {
            "budget": afterBuyingCow.toString()
        };
        const cowUpdateData = {
            "label": "sold out"
        };
        // collect seller id from cowData into populate seller
        const sellerId = (_a = cowData === null || cowData === void 0 ? void 0 : cowData.seller) === null || _a === void 0 ? void 0 : _a.id;
        const incomeData = (_b = cowData === null || cowData === void 0 ? void 0 : cowData.seller) === null || _b === void 0 ? void 0 : _b.income;
        // seller present money and after selling cow money will be add to her income 
        const afterSellingCowIncome = parseInt(incomeData) + (cowData === null || cowData === void 0 ? void 0 : cowData.price);
        const sellerUpdateData = {
            "income": afterSellingCowIncome.toString()
        };
        // update seller income 
        const sellerUpdateIncomeResult = yield user_model_1.User.findByIdAndUpdate({ _id: sellerId }, sellerUpdateData, { new: true });
        // update buyer budget
        const buyerUpdateResult = yield user_model_1.User.findByIdAndUpdate({ _id: buyerId }, buyerUpdatedData, { new: true });
        // update cow label for sale to sold out
        const cowUpdateDataResult = yield cow_model_1.Cow.findByIdAndUpdate({ _id: cowId }, cowUpdateData, { new: true }).populate("seller");
        // now create confirm order of user
        const result = (yield order_model_1.Order.create(orderData)).populate('cow');
        return result;
    }
    else {
        if ((cowData === null || cowData === void 0 ? void 0 : cowData.label) === "sold out") {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `sorry to say that. This cow are already ${cowData === null || cowData === void 0 ? void 0 : cowData.label}`);
        }
        else {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You haven't enough budget to buy this cow. Cow price ${cowData === null || cowData === void 0 ? void 0 : cowData.price}`);
        }
    }
});
const getAllOrderToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({}).populate({ path: 'cow', populate: [{ path: 'seller' }] }).populate('buyer');
    return result;
});
const getSingleOrderToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(payload).populate({ path: 'cow', populate: [{ path: 'seller' }] }).populate('buyer');
    return result;
});
exports.orderService = {
    createOrderToDB,
    getAllOrderToDB,
    getSingleOrderToDB
};
