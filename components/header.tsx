import Image from "next/image";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import Cookies from "js-cookie";
export default function Header() {
  function handler() {
    Cookies.remove('access_token')
    localStorage.removeItem('user-storage')
    window.location.href = '/auth'
    const {logout} = useUserStore()
    logout()
  }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  {/* <span className="text-xl font-bold">ES365</span> */}
                  <Image src={'/logo.png'} alt="Logo" width={60} height={60} /> 
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/bussiness" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Главная
                  </a>
                  <a href="/bussiness/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Товары
                  </a>
                  <a href="/bussiness/sales" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Продажи
                  </a>
                  <a href="/bussiness/managers" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Менеджеры
                  </a>
                  <a href="/bussiness/shifts" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Смены
                  </a>
                  <Button className="bg-fuchsia-400 text-white" onClick={handler}>Выход</Button>
                </div>
              </div>
            </div>
            
          </div>
    );
}