import { loginDto } from "@/app/types/user.types";
import { axiosClassic } from "../api.config";

export const AuthService  = {
    async login(mail: string, pass: string) {
        const response = await axiosClassic.post<loginDto>('/auth/login', {email: mail, password: pass});
        return response.data    
    }
}