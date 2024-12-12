import { useUserStore } from '@/store/user.store'
import axios, {type CreateAxiosDefaults} from 'axios'
import { AuthService, getAccessToken } from './service/auth.service'
import { errorCatch } from './api.error'
import Cookies from 'js-cookie'
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
axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        if(error?.response?.status === 401 ||
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'jwt must  be provided' &&
            error.config &&
            !error.config._isRetry
        ){
            originalRequest._isRetry = true
            try {
                try {
                    await AuthService.getNewTokens()
                } catch (error) {
                    window.location.href = '/auth';
                    return;
                }
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    Cookies.remove('access_token')
                    window.location.href = '/auth';
                    return;
                }
            }
        }
        throw error
    }
)


export { axiosClassic, axiosWithAuth }