import { Imanagers } from "@/app/types/managers.types"
import { axiosWithAuth } from "../api.config"

export const ManagerService  = {
    getAllManagers() {
        const response = axiosWithAuth.get<Imanagers[]>('/manager/all')
        return response
    },
    
}