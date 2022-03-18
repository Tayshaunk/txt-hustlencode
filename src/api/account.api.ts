import { UpdateHustlencodeProfileGeneral } from 'dtos/hustlencode-profile.dto';
import { IServerResponse } from 'interfaces/server.interface';
import axiosInstance from '../config/axios.config';

// base API path for api requests
const BASE_URL = `/hustlencode/account`;

export const updateProfileGeneralApi = async (payload: UpdateHustlencodeProfileGeneral): Promise<IServerResponse> => {
  const url = `${BASE_URL}`;

  const response = await axiosInstance.put<any>(url, payload);

  return response.data;
};

/**
 * Makes API request to check if a username is avaialble
 * @param username
 * @returns
 */
export const checkUsernameAvailAPi = async (username: string): Promise<IServerResponse> => {
  const url = `${BASE_URL}/username/${username}`;

  const response = await axiosInstance.get<any>(url);

  // return payload
  return response.data;
};
