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
    },
    getMonthlyTopManager() {
        return axiosWithAuth.get<{name:string, sell:number}[]>('/statistic/monthly-manager-sell')
    },
    getMonthlySelectedManagerSell(month: string) {
        return axiosWithAuth.get<{name:string, sell:number}[]>(`/statistic/monthly-selected-manager-sell?month=${month}`)
    },
    getIntervalSelectedManagerSell(start: string, end: string) {
        return axiosWithAuth.get<{date:string, data:{manager_name:string, day_sell:number}[]}[]>(`/statistic/manager-stats-by-date-range?startDate=${parseDate(start)}&endDate=${parseDate(end)}`)
    }
}
function parseDate(str:string) {
    const [day, month, year] = str.split('.');
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
  }
  
//   const dateStr = "07.12.2024";
//   const date = parseDate(dateStr);
  
//   if (!isNaN(date.getTime())) {
//     console.log(date.toISOString());
//   } else {
//     console.error('Invalid date string');
//   }