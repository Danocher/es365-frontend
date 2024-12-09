'use client'
import { useUserStore } from '@/store/user.store'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Toaster/>
            {children}
        </div>
    )
}