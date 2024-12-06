import exp from "constants";

export interface RegisterDto{
    email:string;
    password: string;
    name: string;
    phonenum:string;
    company:string;
    inn:string | null
    bik: string | null;
    ogrn: string | null;
}
export interface loginDto{
    user:{
        email:string;
        password: string;
        name: string;
        phonenum:string;
        company:string;
        inn:string | null
        bik: string | null;
        ogrn: string | null;
    },
    token:string
}