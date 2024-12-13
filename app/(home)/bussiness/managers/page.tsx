'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, Pencil, TrashIcon, Edit } from 'lucide-react';
import { useUserStore } from '@/store/user.store';
import { ManagerService } from '@/api/service/manager.service';
import { Imanagers } from '@/app/types/managers.types';
import Loading from '@/components/loading';
import DeleteDialogue from './_components/delete-modal';
import CreateManagerModal from './_components/create-modal';
import EditDialog from './_components/edit-modal';
interface Manager {
  id: string;
  name: string;
  email: string;
}
export default function ManagersPage() {
  // const [managers, setManagers] = useState<Manager[]>([
  //   {
  //     id: '1',
  //     name: 'Иван Петров',
  //     email: 'ivan@example.com'
  //   },
  //   {
  //     id: '2',
  //     name: 'Мария Сидорова',
  //     email: 'maria@example.com'
  //   }
  // ]);
  const [managers, setManagers] = useState<Imanagers[]>();
  useEffect(() => {
    ManagerService.getAllManagers()
      .then((res) => {
        if (res) {
          setManagers(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newManager, setNewManager] = useState<Partial<Manager>>({});

  const handleAddManager = () => {
    // if (newManager.name && newManager.email) {
    //   setManagers([...managers, {
    //     id: Date.now().toString(),
    //     name: newManager.name,
    //     email: newManager.email
    //   }]);
    //   setIsAddModalOpen(false);
    //   setNewManager({});
    // }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Управление менеджерами</h1>
        <CreateManagerModal/>
      </div>

      {/* Таблица менеджеров */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {!managers ? (<Loading/>):(<table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Имя
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Номер телефона 
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ставка в час
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {managers.map((manager) => (
                    <tr key={manager.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {manager.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {manager.phonenum}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {manager.hour_cost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <EditDialog id={manager.id} name={manager.name} phonenum={manager.phonenum} hour_cost={manager.hour_cost}/>
                        <DeleteDialogue id={manager.id} name={manager.name}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>)}
            </div>{/* Таблица менеджеров */}
          </div>
        </div>
      </div>

      
    </div>
  );
}
