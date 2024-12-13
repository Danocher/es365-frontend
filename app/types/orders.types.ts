export interface IOrders {
    id: string;
    manager_id: string;
    sum: number;
    client_id: string;
    date: Date;
    shift_id: string;
    user_id: string;
    client: {
        id: string;
        user_id: string;
        phonenum: string;
        fullname: string;
        bonuses: number | null;
    };
    manager: {
        id: string;
        user_id: string;
        name: string;
        phonenum: string;
        hour_cost: number;
    };
    products: {
        id: string;
        user_id: string;
        name: string;
        buy: number;
        sell: number;
        buy_date: Date;
    
    }[];
}