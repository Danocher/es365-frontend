'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import {  UserService } from "../../api/service/user.service";
import { RegisterDto } from "../types/user.types";
export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [inn, setInn] = useState('');
    const [bik, setBik] = useState('');
    const [ogrn, setOgrn] = useState('');
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const res  = UserService.createUser({name, email, password, phonenum: Number(phone), company, inn, bik, ogrn});
        console.log(res);
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-md shadow-md w-1/3 min-h-1/3 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">Регистрация</h1>
                <Image src={'/logo.png'} alt="Logo" width={100} height={100} />
                <div className="w-full" >
                    <form className="space-y-4" onSubmit={submit}>
                        <Input type="text" placeholder="Имя"  value={name} onChange={(e) => setName(e.target.value)}/>
                        <Input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input type="phone" placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Input type="text" placeholder="Название организации" value={company} onChange={(e) => setCompany(e.target.value)} />
                        <Input type="text" placeholder="ИНН" value={inn} onChange={(e) => setInn(e.target.value)} />
                        <Input type="text" placeholder="BIK" value={bik} onChange={(e) => setBik(e.target.value)} />
                        <Input type="text" placeholder="ОГРН" value={ogrn} onChange={(e) => setOgrn(e.target.value)} />

                        <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Зарегистрироваться</Button>
                    </form>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Есть аккаунт? <a href="/auth" className="text-blue-500 hover:underline">Войти</a>
                </p>
            </div>
        </div>
    )
}