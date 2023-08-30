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
exports.AdminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdminToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(payload);
    return result;
});
// admin login
const adminLoginToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.Admin.isAdminHere(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Admin is not exist');
    }
    // check given and save password match or not
    if ((isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password) && !(yield admin_model_1.Admin.isPasswordMatched(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password))) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect Password');
    }
    const { role, phoneNumber: phone } = isAdminExist;
    // create access token with singined admin data
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ role, phone }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ role, phone }, config_1.default.jwt.refresh_secrect, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken
    };
});
exports.AdminService = {
    createAdminToDB,
    adminLoginToDB
};
