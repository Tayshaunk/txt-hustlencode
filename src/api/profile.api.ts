import { UpdateHustlencodeProfileAboutDto, UpdateHustlencodeProfileInterestsDto } from 'dtos/hustlencode-profile.dto';
import { ICode } from 'interfaces/post.interface';
import { IServerResponse } from 'interfaces/server.interface';
import axiosInstance from '../config/axios.config';
import { IHustlencodeUser } from '../interfaces/user.interface';

// base API path for api requests
const BASE_URL = `/hustlencode/profile`;

/**
 * Makes API request for users profile data
 * @param username The user's username
 * @returns
 * - User profile data
 */
export const getProfileApi = async (username: string): Promise<IHustlencodeUser> => {
  const url = `${BASE_URL}/${username}`;

  const response = await axiosInstance.get<any>(url);

  // return user token
  return response.data.payload;
};

/**
 * Returns Code for the profile about module
 * @param username the user's username
 * @returns
 * - Code for the about module
 */
export const getProfileAboutApi = async (username: string): Promise<ICode> => {
  const url = `${BASE_URL}/${username}/about`;

  const response = await axiosInstance.get<any>(url);

  // return user token
  return response.data.payload;
};

/**
 * Returns code for the profile interests module
 * @param username the user's username
 * @returns
 * - Code for the interests module
 */
export const getProfileInterestsApi = async (username: string): Promise<ICode> => {
  const url = `${BASE_URL}/${username}/interests`;

  const response = await axiosInstance.get<any>(url);

  // return user token
  return response.data.payload;
};

/**
 * Updates and returns the code for the profile about module
 * @param username the user's username
 * @param payload The updated code for the module
 * @returns
 * - The update profile about module code
 */
export const updateProfileAboutApi = async (username: string, payload: UpdateHustlencodeProfileAboutDto): Promise<IServerResponse> => {
  const url = `${BASE_URL}/${username}/about`;

  const response = await axiosInstance.put<any>(url, payload);

  console.log(response);
  // return user token
  return response.data;
};

/**
 * Updates and returns the code for the profile interests module
 * @param username the user's username
 * @param payload The updated code for the interests module
 * @returns
 * - The the updated interests module
 */
export const updateProfileInterestsApi = async (username: string, payload: UpdateHustlencodeProfileInterestsDto): Promise<ICode> => {
  const url = `${BASE_URL}/${username}/interests`;

  const response = await axiosInstance.put<any>(url);

  // return user token
  return response.data.payload;
};
