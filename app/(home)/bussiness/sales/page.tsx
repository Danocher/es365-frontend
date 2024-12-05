'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Product, Sale } from '../../../types';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: '1',
      products: [
        { productId: '1', quantity: 2, priceAtSale: 1000 },
        { productId: '2', quantity: 1, priceAtSale: 2000 }
      ],
      totalAmount: 4000,
      managerId: '1',
      createdAt: '2024-01-20T10:30:00',
      shiftId: '1'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<{
    productId: string;
    quantity: number;
    price: number;
  }[]>([]);

  // Моковые данные для продуктов и менеджеров
  const products: Product[] = [
    { id: '1', name: 'Товар 1', price: 1000, quantity: 10 },
    { id: '2', name: 'Товар 2', price: 2000, quantity: 5 }
  ];

  const managers = [
    { id: '1', name: 'Иван Петров' },
    { id: '2', name: 'Мария Сидорова' }
  ];

  const handleAddSale = () => {
    if (selectedProducts.length > 0) {
      const totalAmount = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const newSale: Sale = {
        id: Date.now().toString(),
        products: selectedProducts.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtSale: item.price
        })),
        totalAmount,
        managerId: '1', // В реальном приложении это будет ID текущего менеджера
        createdAt: new Date().toISOString(),
        shiftId: '1' // В реальном приложении это будет ID текущей смены
      };

      setSales([...sales, newSale]);
      setIsAddModalOpen(false);
      setSelectedProducts([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Продажи</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Новая продажа
        </button>
      </div>

      {/* Таблица продаж */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Менеджер
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Товары
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sale.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {managers.find(m => m.id === sale.managerId)?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <ul>
                          {sale.products.map((item, index) => {
                            const product = products.find(p => p.id === item.productId);
                            return (
                              <li key={index}>
                                {product?.name} x {item.quantity} = {item.priceAtSale * item.quantity}₽
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.totalAmount}₽
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно добавления продажи */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Новая продажа</h3>
                <div className="space-y-4">
                  {selectedProducts.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={item.productId}
                        onChange={(e) => {
                          const newProducts = [...selectedProducts];
                          const product = products.find(p => p.id === e.target.value);
                          newProducts[index] = {
                            ...newProducts[index],
                            productId: e.target.value,
                            price: product?.price || 0
                          };
                          setSelectedProducts(newProducts);
                        }}
                      >
                        <option value="">Выберите товар</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {product.price}₽
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Кол-во"
                        value={item.quantity}
                        onChange={(e) => {
                          const newProducts = [...selectedProducts];
                          newProducts[index] = {
                            ...newProducts[index],
                            quantity: Number(e.target.value)
                          };
                          setSelectedProducts(newProducts);
                        }}
                      />
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          const newProducts = [...selectedProducts];
                          newProducts.splice(index, 1);
                          setSelectedProducts(newProducts);
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setSelectedProducts([...selectedProducts, { productId: '', quantity: 1, price: 0 }])}
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                    Добавить товар
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddSale}
                >
                  Создать продажу
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedProducts([]);
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
