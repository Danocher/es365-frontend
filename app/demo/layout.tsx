import Image from "next/image"

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex flex-1">
                <div className="flex-shrink-0 flex items-center">
                
                  <Image src={'/logo.png'} alt="Logo" width={60} height={60} /> 
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/demo" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Главная
                  </a>
                  <a href="/demo/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Товары
                  </a>
                  <a href="/demo/sales" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Продажи
                  </a>
                  <a href="/demo/managers" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Менеджеры
                  </a>
                  <a href="/demo/shifts" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Смены
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  </div>
              </div>
            </div>
          </div>
            {children}</div>
    )
}