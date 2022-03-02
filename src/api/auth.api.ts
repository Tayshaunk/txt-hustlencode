import axiosInstance from "../config/axios.config";
import {IHustlencodeUser} from 'interfaces/user.interface'

// base API path for api requests
const BASE_URL = `/hustlencode/auth`;

/**
 * Makes API request to login using the
 * provided login credentials
 * @returns user jwt token
 */
export const loginApi = async (credentials: any): Promise<string> => {
  const url = `${BASE_URL}/login`;

  const response = await axiosInstance.post<any>(url, credentials);

  // return user token
  return response.data.payload;
};

/**
 * Makes API request for users profile data
 * @returns 
 */
export const getProfileApi = async (): Promise<IHustlencodeUser> => {
  const url = `${BASE_URL}/profile`;

  const response = await axiosInstance.get<any>(url);
  console.log(response.data);

  // return user token
  return response.data.payload;
};
