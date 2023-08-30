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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_model_1 = require("./cow.model");
const createCowToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield cow_model_1.Cow.create(payload)).populate("seller");
    return result;
});
const getAllCowToDb = (paginationOptions, allFiltersOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm, minPrice, maxPrice } = allFiltersOptions, filtersData = __rest(allFiltersOptions, ["searchTerm", "minPrice", "maxPrice"]);
    const cowSearchAbleFields = ["location", "breed", "category"];
    const filterAndSearchCondition = [];
    if (searchTerm) {
        filterAndSearchCondition.push({
            $or: cowSearchAbleFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // console.log(filtersData);
    if (Object.keys(filtersData).length) {
        filterAndSearchCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // if(maxPrice || minPrice){
    //     filterAndSearchCondition.push({
    //         $and: [maxPrice, minPrice].map((value) => ({
    //             price: value
    //         })) 
    //     })
    // }
    if (maxPrice) {
        filterAndSearchCondition.push({
            price: { $gte: parseInt(maxPrice) }
        });
    }
    else if (minPrice) {
        filterAndSearchCondition.push({
            price: { $lte: parseInt(minPrice) }
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const totalQueryOfCowData = filterAndSearchCondition.length > 0 ? { $and: filterAndSearchCondition } : {};
    const result = yield cow_model_1.Cow.find(totalQueryOfCowData).populate("seller")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const totalCow = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            total: totalCow,
        },
        data: result,
    };
});
const getSingleCowToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
const updateCowToDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndUpdate({ _id: id }, updateData, { new: true }).populate('seller');
    return result;
});
const deleteCowToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowServices = {
    createCowToDB,
    getAllCowToDb,
    getSingleCowToDB,
    updateCowToDB,
    deleteCowToDB
};
