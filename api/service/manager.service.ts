import { Imanagers, ManagerDto } from "@/app/types/managers.types"
import { axiosWithAuth } from "../api.config"

export const ManagerService  = {
    getAllManagers() {
        const response = axiosWithAuth.get<Imanagers[]>('/manager/all')
        return response
    },
    async deleteManager(id: string) {
        const response = await axiosWithAuth.delete(`/manager/delete?manager_id=${id}`)
        return response
    },
    async addManager(data: ManagerDto) {
        const response = await axiosWithAuth.post<{success:string}>('/manager/add', data)
        return response
    },
    async updateManager(id:string, data: ManagerDto) {
        const response = await axiosWithAuth.put<{success:string}>('/manager/update', {id, ...data})
        return response
    },
    
}