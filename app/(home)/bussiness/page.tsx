'use client';
import Image from "next/image";
import { ArrowUpIcon, DollarSignIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { StatisticService } from "@/api/service/statistic.service";
import Loading from "@/components/loading";
import { useUserStore } from "@/store/user.store";
import { IOpenedShift } from "@/app/types/shift.types";
import { ManagerService } from "@/api/service/manager.service";
import { Imanagers } from "@/app/types/managers.types";
import { toast } from "sonner";
// import { useStatisticMonthlySell } from "@/api/hooks/statistic.hooks";
export default function Home() {
  
  // Здесь будут данные из API
  const [totalSales, setTotalSales] = useState(0);
  const [activeManagers, setActiveManagers] = useState(0);
  const [productCount, setProductCount] = useState(0);
  // const [sell, isLoadingSell] = useStatisticMonthlySell()
  const [isLoadings, setIsLoading] = useState(true);
  const [isLoadingSell, setIsLoadingSell] = useState(true);
  const [isLoadingsProduct, setIsLoadingProduct] = useState(true);
  const [activeShift, setActiveShift] = useState<IOpenedShift>();
  const [managers, setManagers] = useState<Imanagers[]>();
  useEffect(() => {
    ManagerService.getAllManagers() 
      .then((res) => {
        if (res) {
          setManagers(res.data);
        }
      })
      .catch((e) => {
        toast.error(e);});
    StatisticService.getMonthlySell()
    .then((res) => {
      setTotalSales(res.data.sum)
      setIsLoadingSell(false)
    })
    StatisticService.getActiveManagers()
    .then((res) => {
      setActiveManagers(res.data.manager_id)
      setIsLoading(false)
    })
    StatisticService.getProductCount()
    .then((res) => {
      console.log(res.data)
      setProductCount(res.data.id)
      setIsLoadingProduct(false)
    })
    const shift = localStorage.getItem('shift')
    if (shift) {
      setActiveShift(JSON.parse(shift))
    }
  }, []);

  const stats = {
    totalSales: '124,500₽',
    salesGrowth: '+12%',
    totalProducts: '45',
    activeManagers: '3',
    currentShift: {
      manager: 'Иван Петров',
      startTime: '09:00',
      sales: '45,300₽'
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Панель управления</h1>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Общие продажи */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSignIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Общие продажи за месяц</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{!isLoadingSell ? totalSales : (<Loading />)}</div>
                        {/* <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                          <span className="sr-only">Increased by</span>
                          {stats.salesGrowth}
                        </div> */}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Количество товаров */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Товаров в наличии</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{!isLoadingsProduct ? productCount : (<Loading />)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Активные менеджеры */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Активные менеджеры</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{isLoadings ? (<Loading />) : activeManagers}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Текущая смена */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-gray-500">Текущая смена</h3>
                  {activeShift ? ( <dl className="mt-2 space-y-1">
                    <div className="text-sm text-gray-900">
                      <dt className="inline">Менеджер: </dt>
                      <dd className="inline font-medium">{managers?.find(manager => manager.id === activeShift.manager_id)?.name}</dd>
                    </div>
                    <div className="text-sm text-gray-900">
                      <dt className="inline">Начало: </dt>
                      <dd className="inline font-medium">{new Date(activeShift.date_start).toLocaleString()}</dd>
                    </div>
                    {/* <div className="text-sm text-gray-900">
                      <dt className="inline">Продажи: </dt>
                      <dd className="inline font-medium">{stats.currentShift.sales}</dd>
                    </div> */}
                  </dl>):(<div>Смена не открыта</div>) }

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}