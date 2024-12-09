import { IShift, IShifts, shiftClose } from "@/app/types/shift.types"
import { axiosWithAuth } from "../api.config"

export const ShiftService  = {
    
    getShifts() {
        const response = axiosWithAuth.get<IShifts[]>('/shift/list')
        return response 
    },
    getShiftById(id: string) {
        const response = axiosWithAuth.get<IShifts>(`/shift/shift-by-id?shift_id=${id}`)
        return response 
    },
    async openShift(managerId: string) {
        const response =  await axiosWithAuth.post<IShift>('/shift/open', {manager: managerId})
        return response.data 
    },
    async closeShift(){
        const response = await axiosWithAuth.post<shiftClose>('/shift/close')
        return response.data
    }
}