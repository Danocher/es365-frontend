'use client'
import { ShiftService } from "@/api/service/shift.service";
import { IShifts } from "@/app/types/shift.types";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Params {
    id: string;
}
export default function ShiftsId({params}: {params: Params}) {
    const [shift, setShift] = useState<IShifts>();
    useEffect  (() => {
        ShiftService.getShiftById(params.id).then((res) => {
            setShift(res.data)
        }).catch((e) => {
            toast.error(e)
        })
    }, [])
   
    return (
        <div className="container mx-auto p-4">
            {!shift ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Информация о смене</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Основная информация</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium">Менеджер:</span> {shift.manager.name}</p>
                                <p><span className="font-medium">Начало смены:</span> {new Date(shift.date_start).toLocaleString()}</p>
                                <p><span className="font-medium">Конец смены:</span> {shift.date_end ? new Date(shift.date_end).toLocaleString() : 'Не завершена'}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Заказы</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium">Количество заказов:</span> {shift.order.length}</p>
                                <p><span className="font-medium">Общая сумма:</span> {shift.order.reduce((acc, order) => acc + order.sum, 0)} ₽</p>
                            </div>
                        </div>
                    </div>

                    {shift.order.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-2">Список заказов</h2>
                            <div className="space-y-4">
                                {shift.order.map((order) => (
                                    <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="font-medium">ID заказа: {order.id}</p>
                                                <p>Сумма: {order.sum} ₽</p>
                                                <p>Дата: {new Date(order.date).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        
                                        {order.products && order.products.length > 0 && (
                                            <div className="overflow-x-auto">
                                                <h3 className="text-md font-medium mb-2">Товары  в заказе</h3>
                                                <table className="min-w-full table-auto">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="px-4 py-2">Название</th>
                                                            <th className="px-4 py-2">Закупка</th>
                                                            <th className="px-4 py-2">Продажа</th>
                                                            <th className="px-4 py-2">Прибыль</th>
                                                            <th className="px-4 py-2">Дата закупки</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products.map((product) => (
                                                            <tr key={product.id} className="border-b">
                                                                <td className="px-4 py-2 text-center">{product.name}</td>
                                                                <td className="px-4 py-2 text-center">{product.buy} ₽</td>
                                                                <td className="px-4 py-2 text-center">{product.sell} ₽</td>
                                                                <td className="px-4 py-2 text-center">{product.sell - product.buy} ₽</td>
                                                                <td className="px-4 py-2 text-center">{new Date(product.buy_date).toLocaleString()}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}