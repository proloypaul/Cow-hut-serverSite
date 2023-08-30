import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";


const auth = (...userRequiredRoles: string[]) => 
async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization;

        console.log('role of user', userRequiredRoles)
        // check user are authorized or not
        console.log("Before the token check condition")
    
        if(!token){
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
        }
        console.log("After the token check condition")
        //verify user token
        let verifiedUser = null;
        verifiedUser = jwtHelpers.verifyToken(
            token,
            config.jwt.secret as Secret
        );

        req.user = verifiedUser; // add user into Express Request using index.d.ts file

        console.log('token of auth', token)
        // check user role is have in the token
        if(userRequiredRoles.length && !userRequiredRoles.includes(verifiedUser.role)){
            throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
        } 
        console.log("say you are work na")
        next()
    }catch(error){
        next()
    }
};

export default auth;