import axiosInstance from '../config/axios.config';
import { IHustlencodeUserSession } from 'interfaces/user.interface';
import { IServerResponse } from 'interfaces/server.interface';
import { AxiosResponse } from 'axios';
import { HncForgotPasswordDto, HncLoginDto, HncResetPasswordDto, HncSignupDto } from 'dtos/hustlencode-auth.dto';

// base API path for api requests
const BASE_URL = `/hustlencode/auth`;

/**
 * Makes API request to login using the
 * provided login credentials
 * @returns user jwt token
 */
export const loginApi = async (credentials: HncLoginDto): Promise<string> => {
  const url = `${BASE_URL}/login`;

  const response = await axiosInstance.post<any>(url, credentials);

  // return user token
  return response.data.payload;
};


export const signUpApi = async (credentials: HncSignupDto): Promise<string> => {
  const url = `${BASE_URL}/signup`;

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

/**
 * Makes API request for instructions to reset
 * profile password
 * @returns
 */
export const forgotPasswordApi = async (payload: HncForgotPasswordDto): Promise<string> => {
  const url = `${BASE_URL}/forgot-password`;

  // make request for email reset instructions
  const response: AxiosResponse<IServerResponse> = await axiosInstance.post<any>(url, payload);

  // return user token
  return response.data.message;
};

export const resetPasswordApi = async (payload: HncResetPasswordDto): Promise<string> => {
  const url = `${BASE_URL}/reset-password`;

  // make request for email reset instructions
  const response: AxiosResponse<IServerResponse> = await axiosInstance.post<any>(url, payload);

  // return user token
  return response.data.message;
};
