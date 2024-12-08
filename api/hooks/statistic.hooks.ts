// import { use, useEffect, useState } from "react"
// import { StatisticService } from "../service/statistic.service"

// export const useStatisticMonthlySell = () => {
//     const [isLoadingSell, setIsLoadingSell] = useState(false)
//     const [sell, setSell] = useState(0)
//     const data =StatisticService.getMonthlySell()

//     useEffect(() => {
//             setSell(data?.sum)
//             setIsLoadingSell(false)
//     }, [data])
//     return {
//         isLoadingSell,
//         sell
//     }
// }