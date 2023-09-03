import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";


const auth = (...requiredRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
        }

        // verify token
        let verifiedUser = null;

        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

        req.user = verifiedUser // inser into express request object according to index.d.ts file

        // check role 
        if(requiredRoles.length && !requiredRoles.includes(verifiedUser.role)){
            throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
        }

        next()
    }catch(error){
        next(error)
    }

};

export default auth;