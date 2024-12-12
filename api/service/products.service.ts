import { IProduct, IProducts, IProductUUpdate } from "@/app/types/products.types"
import { axiosWithAuth } from "../api.config"

export const ProductsService = {
    getAllProducts(){
        return axiosWithAuth.get<IProducts[]>(`/products/get`)
    },
    deleteProduct(id: string){
        return axiosWithAuth.delete<{success:string}>(`/products/delete?id=${id}`)
    },
    createProduct(data: IProduct){
        return axiosWithAuth.post<{success:string}>('/products/create', data)
    },
    updateProduct(data: IProductUUpdate){
        return axiosWithAuth.put<{success:string}>('/products/update', data)
    }
}