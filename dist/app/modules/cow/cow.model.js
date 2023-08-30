"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constraint_1 = require("./cow.constraint");
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: cow_constraint_1.loacationEnums },
    breed: { type: String, required: true, enum: cow_constraint_1.breedEnums },
    weight: { type: Number, required: true },
    label: { type: String, required: true, enum: cow_constraint_1.labelEnums, default: "for sale" },
    category: { type: String, required: true, enum: cow_constraint_1.categoryEnums },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
