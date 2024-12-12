'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, Pencil, TrashIcon } from 'lucide-react';
import { Product } from '../../../types';
import { useUserStore } from '@/store/user.store';
import { ProductsService } from '@/api/service/products.service';
import { IProducts } from '@/app/types/products.types';
import Loading from '@/components/loading';
import AlertDialogue from './_components/alert-dialog';
import CreateDialog from './_components/create-dialog';
import EditDialog from './_components/edit-dialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Товар 1',
      price: 1000,
      quantity: 10,
      description: 'Описание товара 1'
    },
    {
      id: '2',
      name: 'Товар 2',
      price: 2000,
      quantity: 5,
      description: 'Описание товара 2'
    }
  ]);
  const [prod, setProd] = useState<IProducts[]>();
  useEffect(() => {
    ProductsService.getAllProducts().then((data) => {
      setProd(data.data);
    });
  }, []);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [deleteProd, setDelete] = useState(false);
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      setProducts([...products, {
        id: Date.now().toString(),
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
        description: newProduct.description
      }]);
      // setIsAddModalOpen(false);
      setNewProduct({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Управление товарами</h1>
        <CreateDialog />
      </div>

      {/* Таблица товаров */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена Продажи
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена Покупки
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Прибыль с одной продажи
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!prod ? (<Loading/>) : ( prod.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.sell}₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.buy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(product.buy_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.sell - product.buy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <EditDialog id={product.id} name={product.name} buy={product.buy.toString()} sell={product.sell.toString()} date={product.buy_date}/>
                        <AlertDialogue id={product.id} name={product.name}/>
                        
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
