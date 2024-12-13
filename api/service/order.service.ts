import axios from "axios"
import { axiosWithAuth } from "../api.config"
import { IOrders } from "@/app/types/orders.types"
import { get } from "http"

export const OrderService = {
    getAllOrders(){
        return axiosWithAuth.get<IOrders[]>('/order/all')
    },
    getOrderById(id: string){
        return axiosWithAuth.get<IOrders>(`/order/order-by-id?order_id=${id}`)
    }

}