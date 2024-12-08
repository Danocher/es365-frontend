import { loginDto } from '@/app/types/user.types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
    user: Iuser | null
    token: string
    isLoading: boolean
    login: (user: Iuser | null, token: string) => void
    logout: () => void
}

interface Iuser {
    email: string
    password: string
    name: string
    phonenum: string
    company: string
    inn: string | null
    bik: string | null
    ogrn: string | null
} 

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: '',
            isLoading: false,
            login: (userData: Iuser | null, tokenAccess: string) => {
                set({ user: userData, token: tokenAccess, isLoading: false })
            },
            logout: () => set({ user: null, token: '', isLoading: false }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)