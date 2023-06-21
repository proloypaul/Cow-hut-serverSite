import { Icow } from "./cow.interface";
import { Cow } from "./cow.model";

const createCowToDB = async(payload:Icow):Promise<Icow> => {
    
    const result = (await Cow.create(payload)).populate("seller");

    return result;
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
    getSingleCowToDB,
    updateCowToDB,
    deleteCowToDB
}