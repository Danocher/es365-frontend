'use client'
import { AuthService } from "@/api/service/auth.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store/user.store"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import Cookies from "js-cookie"
import Loading from "@/components/loading"
import { useRouter } from 'next/navigation'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await AuthService.login(email, password)
            if (res) {
                toast.success(`С возвращением, ${res.user.company}!`)
                login(res.user, res.token)
                console.log(res.user, res.token, 'юзер получен')
                Cookies.set('access_token', res.token)
                // Даем время для обновления состояния
                setTimeout(() => {
                    router.push('/bussiness')
                }, 1000)
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message || 'Ошибка авторизации')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-md shadow-md w-1/3 min-h-1/3 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">Авторизация</h1>
                {isLoading && <Loading/>}
                <Image src={'/logo.png'} alt="Logo" width={100} height={100} />
                <div className="w-full" >
                    <form className="space-y-4" onSubmit={submit}>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                            Войти
                        </Button>
                    </form>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Нет аккаунта? <a href="/register" className="text-blue-500 hover:underline">Зарегистрируйтесь</a>
                </p>
            </div>
        </div>
    )
}