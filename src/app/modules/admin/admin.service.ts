import { Iadmin } from "./admin.interface";
import { Admin } from "./admin.model";


const createAdminToDB = async(payload: Iadmin):Promise<Iadmin> => {
    const result = await Admin.create(payload);

    return result
}

export const AdminService = {
    createAdminToDB
}