import { axiosWithAuth } from "../api.config"

export const StatisticService  = {
    getMonthlySell() {
        return axiosWithAuth.get<{sum:number}>('/statistic/monthly-sell')
    },
    getActiveManagers() {
        return axiosWithAuth.get<{manager_id:number}>('/statistic/active-managers')
    },
    getProductCount() {
        return axiosWithAuth.get<{id:number}>('/statistic/product-count')
    }
}