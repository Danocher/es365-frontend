import { RegisterDto } from "@/app/types/user.types";
import { axiosClassic } from "../api.config";

export const UserService  = {
    async createUser(data: RegisterDto) {
        const response = await axiosClassic.post<RegisterDto>('/user/create', data);
        return response.data
    }
}