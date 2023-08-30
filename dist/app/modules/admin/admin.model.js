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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
        select: 0
    },
    role: {
        type: String,
        required: true,
        enum: ['admin']
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
// using static method create two method isAdminHere and isPasswordMatch
adminSchema.statics.isAdminHere = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = yield exports.Admin.findOne({ phoneNumber }, { phoneNumber: 1, password: 1, role: 1 });
        return admin;
    });
};
adminSchema.statics.isPasswordMatched = function (givenPassword, savePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        let isMatch = null;
        if (givenPassword === savePassword) {
            isMatch = true;
        }
        return isMatch;
    });
};
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
