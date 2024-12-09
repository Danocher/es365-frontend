'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, Pencil, TrashIcon, PlayIcon, StopCircle } from 'lucide-react';
import { ShiftService } from '@/api/service/shift.service';
import { IOpenedShift, IShifts } from '@/app/types/shift.types';
import { Shift } from '@/app/types';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
import { Imanagers } from '@/app/types/managers.types';
import { ManagerService } from '@/api/service/manager.service';
import { toast, Toaster } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ShiftsPage() {
  const router = useRouter();
  const [activeShift, setActiveShift] = useState<IOpenedShift>()
  const [managerId, setManagerId] = useState<string>('');
  function handleOpenShift() {
    ShiftService.openShift(managerId)
        .then((res) => {
          if (res) {
            localStorage.setItem('shift', JSON.stringify(res.fullShift));
            console.log(res);
            toast.success(res.shift);
            setTimeout(()=>{
              window.location.reload()
            }, 1500)
          }
        })
        .catch((e) => {
          console.log(e.response.data.error)
          toast.error(e.response.data.error);
        });
  }
  function handleEndShift(){
    ShiftService.closeShift()
    .then((res)=>{
      localStorage.removeItem('shift')
      toast.success(`Смена ${res.shift.manager.name} закрыта. Смена составила ${res.time}`)
      setTimeout(()=>{
        window.location.reload()
      }, 1500)
    })
    .catch((res)=>{
      console.log(res)
    })

    }
  
  const [shift, setShift] = useState<IShifts[]>();
  const [managers, setManagers] = useState<Imanagers[]>();
  useEffect(() => {
    ShiftService.getShifts()
      .then((res) => {
        if (res) {
          setShift(res.data);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
    ManagerService.getAllManagers() 
      .then((res) => {
        if (res) {
          setManagers(res.data);
        }
      })
      .catch((e) => {
        toast.error(e);});
        const shift = localStorage.getItem('shift')
        if(shift){
          setActiveShift(JSON.parse(shift))

        }
  }, []);
  return (
    <div className="space-y-6">
      <Toaster/>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Управление сменами</h1>
        <div className="flex gap-2">
            <Select  onValueChange={(e)=>setManagerId(e)} defaultValue=''
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбрать менеджера" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup >
                  <SelectLabel>Менеджер</SelectLabel>
                  {!managers ? (<Loading/>) : managers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
        </Select>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={handleOpenShift}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Начать смену
          </button>
        </div>
      </div>

      {/* Активные смены */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Активные смены</h2>
        </div>
        <div className="border-t border-gray-200">
          <div className="divide-y divide-gray-200">
            {activeShift ? (
              <div  className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Менеджер: {managers?.find(manager => manager.id === activeShift.manager_id)?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Начало: {new Date(activeShift.date_start).toLocaleString()}
                    </p>
                    
                  </div>
                  <button
                    onClick={handleEndShift}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <StopCircle className="-ml-0.5 mr-2 h-4 w-4" />
                    Закрыть смену
                  </button>
                </div>
              </div>
            ) :(<p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Нет активных смен
            </p>)}
          </div>
        </div>
      </div>

      {/* История смен */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Менеджер
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Начало
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Окончание
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Продажи
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!shift ?(<Loading/>) : (shift.map((shift) => (
                    <tr key={shift.id} onClick={() => router.push(`/bussiness/shifts/${shift.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {shift.manager.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(shift.date_start).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shift.date_end ? new Date(shift.date_end).toLocaleString() : 'Не окончена'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shift.order.reduce((acc, order) => acc + order.sum, 0)} ₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shift.date_end  
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {!shift.date_end  ? 'Активна' : 'Закрыта'}
                        </span>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
