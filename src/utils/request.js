import axios from "axios";
import { getAuthToken, getRefreshToken, setToken } from "./auth";
import createAuthRefreshInterceptor from "axios-auth-refresh";


export const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000
})


request.interceptors.request.use(config => {
    if(!config.headers){
        config.headers = {}
    }

    const token = getAuthToken()

    if(token){
        config.headers['Authorization'] =  `Bearer ${token}`
    }

    return config;
})


request.interceptors.response.use(
    response => {
    return response;
    },
    error => {
        console.log(error)
        const errorCode = error.response.status
        // const errorDetail = error.response.data
        if(errorCode == 500) {
            alert("Terjadi kesalahan pada server")
            return Promise.reject(error)
        } else if (errorCode == 404) {
            alert("Halaman tidak ditemukan")
            return Promise.reject(error)
        }
        //  else if (errorCode == 401) {
        //     if(errorDetail.message == null )
        //     alert("Sesi anda telah habis, silahkan login kembali")
        //     setToken(null)
        //     return Promise.reject(error)
        // }

        return Promise.reject(error)
})


const refreshAuth = (failedRequest) => {
    return new Promise((resolve, reject) => {
        axios
        .post(`${import.meta.env.VITE_APP_API_URL}/auth/refresh/`, {
            refresh: getRefreshToken()
        })
        .then((response) => {
            console.log(response)
            const newAccess = response.data
            setToken(newAccess)
            failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccess}`
            resolve()
        })
        .catch((error) => {
            setToken(null)
            location.replace('/')
            alert("Sesi akses anda telah habis, silahkan login kembali")
            reject(error);
            });
    })
    
}

  createAuthRefreshInterceptor(request, refreshAuth);