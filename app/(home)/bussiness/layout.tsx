'use client'
import Header from "@/components/header"
import { useUserStore } from "@/store/user.store"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import Loading from "@/components/loading"

export default function BussinessLayout({children,}: {children: React.ReactNode}) {
    const router = useRouter()
    const {user, isLoading} = useUserStore()
    const isAuth  = useUserStore(state => state.isAuth)
    // if(isLoading) return <Loading/>
    // else if(!user) router.push('/auth')    
    // if(isLoading) return <Loading/>
    if(!isAuth && !isLoading) {
        router.push('/auth')
    }
    // if(!user) {
    //     router.push('/auth')
    // }
    else if(!isLoading){
        
        return (
            <div>
                <Header/>
                {children}
            </div>
        )}
}