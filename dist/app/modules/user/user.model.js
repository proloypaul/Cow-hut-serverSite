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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    phoneNumber: { type: Number, required: true, unique: true },
    role: { type: String, required: true, enum: ['seller', 'buyer'] },
    password: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    address: { type: String, required: true },
    budget: { type: String, required: true, default: '0' },
    income: { type: String, required: true, default: '0' }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// hashing user password
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// using static method create two method isUserHere and isPasswordMatch
userSchema.statics.isUserHere = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ phoneNumber }, { id: 1, password: 1, role: 1 });
        return user;
    });
};
userSchema.statics.isPasswordMatched = function (givenPassword, savePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(givenPassword, savePassword);
        return isMatch;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
