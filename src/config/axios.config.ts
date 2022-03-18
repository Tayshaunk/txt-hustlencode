import axios from 'axios'
import { hncTokenStr } from 'constants/localstorage.constants'
import Constants from '../constants/api.constants'

// get token from localstorage if it exists
const token = localStorage.getItem(hncTokenStr) || ''

// sets the server api url, as the base url for all requests
// made using this axios instance
const axiosInstance = axios.create({
  baseURL: Constants.API_URL,
})

// requests will be json by default
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

// set the token as the request bearer token header
axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`

export default axiosInstance
