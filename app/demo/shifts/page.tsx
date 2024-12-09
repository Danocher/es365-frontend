'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, Pencil, TrashIcon, PlayIcon, StopCircle } from 'lucide-react';
// import { Shift } from '../../../types';
interface Shift {
  id: string;
  managerId: string;
  startTime: string;
  endTime?: string;
  totalSales: number;
  status: 'active' | 'closed';
}

export default function ShiftsPage() {
  
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      managerId: '1',
      startTime: '2024-01-20T09:00:00',
      endTime: '2024-01-20T17:00:00',
      totalSales: 45300,
      status: 'closed'
    },
    {
      id: '2',
      managerId: '2',
      startTime: '2024-01-21T09:00:00',
      totalSales: 12500,
      status: 'active'
    }
  ]);

  // Моковые данные менеджеров
  const managers = [
    { id: '1', name: 'Иван Петров' },
    { id: '2', name: 'Мария Сидорова' }
  ];

  const handleStartShift = (managerId: string) => {
    const newShift: Shift = {
      id: Date.now().toString(),
      managerId,
      startTime: new Date().toISOString(),
      totalSales: 0,
      status: 'active'
    };
    setShifts([...shifts, newShift]);
  };

  const handleEndShift = (shiftId: string) => {
    setShifts(shifts.map(shift => 
      shift.id === shiftId 
        ? { ...shift, endTime: new Date().toISOString(), status: 'closed' as const }
        : shift
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Управление сменами</h1>
        <div className="flex gap-2">
          <select
            className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handleStartShift(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Выберите менеджера для новой смены</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
            {shifts.filter(shift => shift.status === 'active').map((shift) => (
              <div key={shift.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Менеджер: {managers.find(m => m.id === shift.managerId)?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Начало: {new Date(shift.startTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Продажи: {shift.totalSales}₽
                    </p>
                  </div>
                  <button
                    onClick={() => handleEndShift(shift.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <StopCircle className="-ml-0.5 mr-2 h-4 w-4" />
                    Закрыть смену
                  </button>
                </div>
              </div>
            ))}
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
                  {shifts.map((shift) => (
                    <tr key={shift.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {managers.find(m => m.id === shift.managerId)?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(shift.startTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shift.endTime ? new Date(shift.endTime).toLocaleString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shift.totalSales}₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shift.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {shift.status === 'active' ? 'Активна' : 'Закрыта'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
