import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IpaginationOptions } from "../../../interface/paginationInterface";
import { Iuser } from "./user.interface";
import { User } from "./user.model";
import { IGenericServiceResponse } from "../../../interface/commonInterface";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { object } from "zod";

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

const getSingleUserToDB = async(id:string):Promise<Iuser | null> => {

    const result = await User.findById(id);

    return result 
}

const updateUserToDB = async(id:string, updatedData:Partial<Iuser>):Promise<Iuser | null> => {

  const result = await User.findOneAndUpdate({_id: id}, updatedData, {new: true});
  
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

  return result   
}

const deleteUserToDB = async(id:string):Promise<Iuser | null> => {
    const result = await User.findByIdAndDelete(id);
    return result 
}

// my profile 
const getMyProfileToDB = async(token:string) => {
  
  if(!token){
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized")
  }

  //verify user token
  let verifiedUser = null;
  try{
      verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
      );

  }catch(error){
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid refreshToken');
  }

  const {phoneNumber} = verifiedUser;

  const result = await User.findOne({phoneNumber});
  
  return result;
}


export const UserServices = {
    createUserToDB,
    getAllUserToDB,
    getSingleUserToDB,
    updateUserToDB,
    deleteUserToDB,
    getMyProfileToDB
} 