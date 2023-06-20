import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IpaginationOptions } from "../../../interface/paginationInterface";
import { Iuser } from "./user.interface";
import { User } from "./user.model";
import { IGenericServiceResponse } from "../../../interface/commonInterface";

const createUserToDB = async(payload:Iuser):Promise<Iuser> => {
    // console.log("data come from service", payload)
    const result = await User.create(payload);

    return result;
}

const getAllUserToDB = async(paginationOptions:IpaginationOptions):Promise<IGenericServiceResponse<Iuser[]>> =>  {
   const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculatePagination(paginationOptions);

   const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await User.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const totalAcadmicSemester = await User.countDocuments();

  return {
    meta: {
      page: page,
      limit: limit,
      total: totalAcadmicSemester,
    },
    data: result,
  };

}


export const UserServices = {
    createUserToDB,
    getAllUserToDB
}