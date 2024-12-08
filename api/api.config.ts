import { useUserStore } from '@/store/user.store'
import axios, {type CreateAxiosDefaults} from 'axios'
import { getAccessToken } from './service/auth.service'


const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:4200',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
    
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)
axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

export { axiosClassic, axiosWithAuth }