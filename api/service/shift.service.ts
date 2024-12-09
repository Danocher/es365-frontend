import { axiosWithAuth } from "../api.config"

export const ShiftService  = {
    
    getShifts() {
        const response = axiosWithAuth.get('/shift/list')
        
    }
}