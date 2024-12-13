import { loginDto } from "@/app/types/user.types";
import { axiosClassic } from "../api.config";
import Cookies from "js-cookie";

export const AuthService = {
    async login(mail: string, pass: string) {
        const response = await axiosClassic.post<loginDto>('/auth/login', {email: mail, password: pass});
        
        return response.data    
    },

    async getNewTokens() {
        const response = await axiosClassic.get<{token:string}>('/auth/refresh')
        Cookies.set('access_token', response.data.token, )
        return response.data
    }
}

export const getAccessToken = () => {
    const accessToken = Cookies.get('access_token')
    return accessToken || null
}