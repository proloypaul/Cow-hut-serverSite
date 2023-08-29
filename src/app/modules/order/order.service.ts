import { PARTIAL_CONTENT, StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IbuyerUpdatedData, IcowUpdateData, Iorder } from "./order.interface"
import { Order } from "./order.model";


const createOrderToDB = async(orderData:Iorder): Promise<Iorder> => {
    const {cow:cowId, buyer:buyerId} = orderData;
    // collect buyer data using buyer id 
    const buyerData = await User.findById(buyerId);
    // collect cow data using cow id
    const cowData = await Cow.findById(cowId).populate("seller");

    // if buyer budget is enough to buy the cow then cow label, buyer budget and seller income will be updated 
    if(parseInt(buyerData?.budget as string) >= (cowData?.price as number) && cowData?.label === "for sale"){
        // console.log("Wow we can buy the Cow " + buyerData?.budget+ " " + cowData?.price);
        const afterBuyingCow:number = parseInt(buyerData?.budget as string) - (cowData?.price as number);

        const buyerUpdatedData:IbuyerUpdatedData = {
            "budget": afterBuyingCow.toString()
        }

        const cowUpdateData:IcowUpdateData = {
            "label": "sold out"
        }

        
        // collect seller id from cowData into populate seller
        const sellerId: string = cowData?.seller?.id as string;
        const incomeData: string = cowData?.seller?.income as string ;
        // seller present money and after selling cow money will be add to her income 
        const afterSellingCowIncome = parseInt(incomeData as string) + (cowData?.price as number)
        const sellerUpdateData = {
            "income": afterSellingCowIncome.toString()  
        }
        // update seller income 
        const sellerUpdateIncomeResult = await User.findByIdAndUpdate({_id: sellerId}, sellerUpdateData, {new: true} );
        // update buyer budget
        const buyerUpdateResult = await User.findByIdAndUpdate({_id: buyerId}, buyerUpdatedData, {new: true});
        // update cow label for sale to sold out
        const cowUpdateDataResult = await Cow.findByIdAndUpdate({_id: cowId}, cowUpdateData, {new: true}).populate("seller");

        // now create confirm order of user
        const result = (await Order.create(orderData)).populate('cow')


        return result
    }else{
        if(cowData?.label === "sold out"){
            throw new ApiError(StatusCodes.BAD_REQUEST, `sorry to say that. This cow are already ${cowData?.label}`)    
        }else{
            throw new ApiError(StatusCodes.BAD_REQUEST, `You haven't enough budget to buy this cow. Cow price ${cowData?.price}`)
        }
        
    }
}

const getAllOrderToDB = async():Promise<Iorder[] | null> => {
    const result = await Order.find({}).populate('cow').populate('buyer')

    return result
}

export const orderService = {
    createOrderToDB,
    getAllOrderToDB
}