export interface IProducts {
    id: string;
    name: string;
    buy: number;
    sell: number;
    buy_date: Date;
    user_id: string;
}
export interface IProduct {
    name: string;
    buy: string;
    sell: string;
    date: Date;
}
export interface IProductUUpdate {
    id: string;
    name: string;
    buy: string;
    sell: string;
    date: Date;
}