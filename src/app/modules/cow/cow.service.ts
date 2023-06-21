import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IpaginationOptions } from "../../../interface/paginationInterface";
import { Icow, IfilterOptions } from "./cow.interface";
import { Cow } from "./cow.model";

const createCowToDB = async(payload:Icow):Promise<Icow> => {
    
    const result = (await Cow.create(payload)).populate("seller");

    return result;
} 

const getAllCowToDb = async(paginationOptions:Partial<IpaginationOptions>, allFiltersOptions:Partial<IfilterOptions>) => {
    const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculatePagination(paginationOptions);
    const {searchTerm, minPrice, maxPrice, ...filtersData} = allFiltersOptions;
    
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

    if(maxPrice){
        filterAndSearchCondition.push({
            price: { $gte: parseInt(maxPrice) }  
        })
    }else if(minPrice){
        filterAndSearchCondition.push({
            price: {$lte: parseInt(minPrice)}
        })
    }

    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const totalQueryOfCowData =
    filterAndSearchCondition.length > 0 ? { $and: filterAndSearchCondition } : {};
    const result = await Cow.find(totalQueryOfCowData).populate("seller")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const totalCow = await Cow.countDocuments();

    return {
        meta: {
        page: page,
        limit: limit,
        total: totalCow,
        },
        data: result,
    };



}

const getSingleCowToDB = async(id:string):Promise<Icow | null> => {
    const result = await Cow.findById(id).populate('seller');

    return result
}

const updateCowToDB = async(id:string, updateData:Partial<Icow>):Promise<Icow | null> => {
    const result = await Cow.findByIdAndUpdate({_id: id}, updateData, {new: true}).populate('seller');
    
    return result
}

const deleteCowToDB = async(id:string):Promise<Icow | null> => {
    const result = await Cow.findByIdAndDelete(id);

    return result
}



export const CowServices = {
    createCowToDB,
    getAllCowToDb,
    getSingleCowToDB,
    updateCowToDB,
    deleteCowToDB
}