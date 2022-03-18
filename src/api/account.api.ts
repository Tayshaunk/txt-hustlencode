import { UpdateHustlencodeProfileGeneralDto, UpdateHustlencodeProfilePasswordDto } from 'dtos/hustlencode-account.dto';
import { UpdateHustlencodeProfileGeneral } from 'dtos/hustlencode-profile.dto';
import { IServerResponse } from 'interfaces/server.interface';
import axiosInstance from '../config/axios.config';

// base API path for api requests
const BASE_URL = `/hustlencode/account`;

/**
 * Makes api request to update the user's username
 * and email
 * @param payload 
 * @returns 
 */
export const updateProfileUsernameApi = async (payload: UpdateHustlencodeProfileGeneral): Promise<IServerResponse> => {
  const url = `${BASE_URL}`;

  const response = await axiosInstance.put<any>(url, payload);

  return response.data;
};

/**
 * Makes API request to check if a username is avaialble
 * @param username
 * @returns
 */
export const checkUsernameAvailApi = async (username: string): Promise<IServerResponse> => {
  const url = `${BASE_URL}/username/${username}`;

  const response = await axiosInstance.get<any>(url);

  // return payload
  return response.data;
};

/**
 * Makes API request to update user's password
 * @param payload 
 * @returns 
 */
export const updateProfilePasswordApi = async (payload:UpdateHustlencodeProfilePasswordDto): Promise<IServerResponse> => {
  const url = `${BASE_URL}/password`;

  const response = await axiosInstance.put<any>(url, payload);

  // return payload
  return response.data;
};


export const updateProfileGeneralApi = async (payload:UpdateHustlencodeProfileGeneralDto): Promise<IServerResponse> => {
  const url = `${BASE_URL}/profile`;

  const response = await axiosInstance.put<any>(url, payload);

  // return payload
  return response.data;
};
