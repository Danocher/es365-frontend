'use client'
import Header from "@/components/header"
import { useUserStore } from "@/store/user.store"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import Loading from "@/components/loading"

export default function BussinessLayout({children,}: {children: React.ReactNode}) {
    const router = useRouter()
    const {user, isLoading} = useUserStore()
    
    useEffect(() => {
        console.log('Layout effect - user:', user, 'isLoading:', isLoading)
        if (!user && !isLoading) {
                router.push('/auth')
        }
    }, [user, isLoading])
    
    if (isLoading) { 
        return <Loading/>
    }

    if (!user) {
        return null
    }

    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}