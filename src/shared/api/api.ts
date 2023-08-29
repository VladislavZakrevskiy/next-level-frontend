import axios from 'axios'
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

export const $api = axios.create({
    baseURL: 'https://ulbi-course-server.vercel.app',
    headers: {
        authorization: localStorage.getItem(
            USER_LOCAL_STORAGE_KEY
        ),
    },
})
