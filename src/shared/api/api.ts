import axios from 'axios'
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

export const $api = axios.create({
    baseURL: 'https://ulbi-course-server.vercel.app',
    headers: {
        authorization:
            localStorage.getItem(USER_LOCAL_STORAGE_KEY) ||
            '',
    },
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCAL_STORAGE_KEY) ||
            ''
    }
})
