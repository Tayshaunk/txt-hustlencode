import axios from 'axios'

import Constants from '../constants/api'

const hncTokenStr = "hnc-user-token";

const token = localStorage.getItem(hncTokenStr) || ''

const axiosInstance = axios.create({
  baseURL: Constants.API_URL,
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`

export default axiosInstance
