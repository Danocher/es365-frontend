export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
}

export interface Manager {
    id: string;
    name: string;
    email: string;
}

export interface Sale {
    id: string;
    products: {
        productId: string;
        quantity: number;
        priceAtSale: number;
    }[];
    totalAmount: number;
    managerId: string;
    createdAt: string;
    shiftId: string;
}

export interface Shift {
    id: string;
    managerId: string;
    startTime: string;
    endTime?: string;
    totalSales: number;
    status: 'active' | 'closed';
}
