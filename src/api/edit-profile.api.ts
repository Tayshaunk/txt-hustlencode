import { UpdateHustlencodeProfileAboutDto, UpdateHustlencodeProfileGeneral, UpdateHustlencodeProfileInterestsDto } from 'dtos/hustlencode-profile.dto';
import { ICode } from 'interfaces/post.interface';
import { IServerResponse } from 'interfaces/server.interface';
import axiosInstance from '../config/axios.config';
import { IHustlencodeUser } from '../interfaces/user.interface';

// base API path for api requests
const BASE_URL = `/hustlencode/account`;


export const updateProfileGeneralApi = async (payload:UpdateHustlencodeProfileGeneral): Promise<IServerResponse> => {
  const url = `${BASE_URL}`;

  const response = await axiosInstance.put<any>(url, payload);

  return response.data;
};


export const checkUsernameAvailAPi = async (username:string): Promise<boolean> => {
    const url = `${BASE_URL}/username/${username}`;
  
    const response = await axiosInstance.get<any>(url);
  

    return response.data.payload;
  };
  