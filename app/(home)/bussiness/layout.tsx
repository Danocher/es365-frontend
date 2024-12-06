'use client'
import Header from "@/components/header"
import { useUserStore } from "@/store/user.store"
import { useEffect } from "react"

export default function BussinessLayout({children,}: {children: React.ReactNode}) {
    const user = useUserStore()
    console.log(user)
    useEffect(()=>{
        if (!user.user){
            window.location.href = '/auth'
        }
    },[])
    return (
    <div>
        <Header/>
          
        {children}
        
    </div>
)
}