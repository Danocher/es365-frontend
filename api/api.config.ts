import axios, {type CreateAxiosDefaults} from 'axios'


const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:4200',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
    
}
const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)
export { axiosClassic, axiosWithAuth }