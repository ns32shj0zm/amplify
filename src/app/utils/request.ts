import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { baseService } from './config'
import storage from './storage'

axios.defaults.baseURL = baseService
axios.defaults.withCredentials = false

function checkStatus(response: AxiosResponse): AxiosResponse {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    throw error
}

export async function request(reqUrl: string, options: AxiosRequestConfig = { method: 'GET' }): Promise<AxiosResponse> {
    const response = await axios(reqUrl, options)
        .then(checkStatus)
        .catch(err => {
            throw err
        })
    return response
}
