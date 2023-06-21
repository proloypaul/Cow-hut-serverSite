import { Icow } from "./cow.interface";
import { Cow } from "./cow.model";

const createCowToDB = async(payload:Icow) => {
    
    const result = (await Cow.create(payload)).populate("seller");

    return result;
} 

export const CowServices = {
    createCowToDB
}