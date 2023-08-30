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
exports.UserServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("data come from service", payload)
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUserToDB = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield user_model_1.User.find({})
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const totalAcadmicSemester = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            total: totalAcadmicSemester,
        },
        data: result,
    };
});
const getSingleUserToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUserToDB = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedData, { new: true });
    // try to dynamic update 
    // const isExist = await User.findOne({id});
    // const {name, ...UserOtherData} = isExist
    // const updatedUserData = {...UserOtherData};
    // // dynamicly update user name object. this name object has name, firstName, lastName
    // if(name && Object.keys(name).length > 0){
    //   Object.keys(name).forEach(key => {
    //     const nameKey = `name.${key}` as keyof Partial<Iuser>;
    //     (updatedUserData as Partial<Iuser>)[nameKey] = name[key as keyof typeof name]
    //   })
    // }
    // const result = await User.findOneAndUpdate({_id: id}, updatedUserData, {new: true});
    return result;
});
const deleteUserToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
// my profile 
const getMyProfileToDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    //verify user token
    let verifiedUser = null;
    try {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid refreshToken');
    }
    const { phoneNumber } = verifiedUser;
    const result = yield user_model_1.User.findOne({ phoneNumber });
    return result;
});
exports.UserServices = {
    createUserToDB,
    getAllUserToDB,
    getSingleUserToDB,
    updateUserToDB,
    deleteUserToDB,
    getMyProfileToDB
};
