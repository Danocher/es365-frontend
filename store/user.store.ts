import { loginDto } from '@/app/types/user.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
    user: Iuser | null
    token: string
    login: (user: Iuser | null, token: string) => void
}
interface Iuser{
        email:string;
        password: string;
        name: string;
        phonenum:string;
        company:string;
        inn:string | null
        bik: string | null;
        ogrn: string | null;
    } 
export const useUserStore = create<UserState>()(persist((set) => ({
  user: null,
  token: '',
//   setUser: (user: loginDto | null) => set({ user }),
  login: (userData: Iuser | null, tokenAccess: string) => set({ user:userData, token: tokenAccess }),
}), 
{
    name: 'user-storage',
}
))