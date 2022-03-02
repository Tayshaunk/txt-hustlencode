import axiosInstance from '../config/axios.config';
import { IHustlencodeUser } from '../interfaces/user.interface'


// base API path for api requests
const BASE_URL = `/hustlencode/profile`;

/**
 * Makes API request for users profile data
 * @returns
 */
export const getProfileApi = async (id:string): Promise<IHustlencodeUser> => {
  const url = `${BASE_URL}/${id}`;

  const response = await axiosInstance.get<any>(url);
  console.log(response.data);

  // return user token
  return response.data.payload;
};
