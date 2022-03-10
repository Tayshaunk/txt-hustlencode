import axiosInstance from "../config/axios.config";
import { IHustlencodeUserSession} from 'interfaces/user.interface'

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
 * Makes API request for user session profile data
 * @returns user session data
 */
export const getCurrentUserApi = async (): Promise<IHustlencodeUserSession> => {
  const url = `${BASE_URL}/profile`;

  const response = await axiosInstance.get<any>(url);

  // return user token
  return response.data.payload;
};
