'use client'
import { useUserStore } from '@/store/user.store'
import { useEffect } from 'react'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}