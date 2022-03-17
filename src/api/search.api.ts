
import { ISearchResult } from 'components/NavBarSearch/NavBarSearch';
import axiosInstance from '../config/axios.config';

// base API path for api requests
const BASE_URL = `/hustlencode/search`;

/**
 * Makes API request for users profile data
 * @param username The user's username
 * @returns
 * - User profile data
 */
export const getUserSearchApi = async (search: string): Promise<ISearchResult[]> => {
  const url = `${BASE_URL}/profiles/${search}`;

  const response = await axiosInstance.get<any>(url);

  // return user token
  return response.data.payload;
};
