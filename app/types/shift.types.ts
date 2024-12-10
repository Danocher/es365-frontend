export interface IShifts {
    endTime: string | number | Date;
    startTime: string | number | Date;
    id: string;
    manager_id: string;
    user_id: string;
    date_start: Date;
    date_end: Date | null;
    order: {
        id: string;
        manager_id: string;
        sum: number;
        client_id: string;
        date: Date;
        shift_id: string;
        user_id: string;
        products: {
            id: string;
            user_id: string;
            name: string;
            buy: number;
            sell: number;
            buy_date: Date;
        }[];
    }[];
    manager: {
        id: string;
        user_id: string;
        name: string;
        phonenum: string;
        hour_cost: number;
    };
   
}
export interface IShift {
    shift:string,
    fullShift:{
        id: string;
        date_start: Date;
        date_end: Date | null;
        manager_id: string;
        user_id: string;
        }
    }
export interface IFindShift {
    shift:string,
    fullShift:{
        id: string;
        date_start: Date;
        date_end: Date | null;
        manager_id: string;
        user_id: string;
        }[]
    }
export interface IOpenedShift{
    id: string;
    date_start: Date;
    date_end: Date | null;
    manager_id: string;
    user_id: string;
}
export interface shiftClose{
    shift:{
        date_start: Date;
        date_end: Date;
        manager: {
            name: string;
        };
    }
    time:string
}