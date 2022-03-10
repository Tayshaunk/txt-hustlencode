import { CreateHustlencodePostDto, UpdateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import { IHustlencodePost } from 'interfaces/post.interface';
import { IServerResponse } from 'interfaces/server.interface';
import axiosInstance from '../config/axios.config';

interface IHustlenCodePostPayload {
  posts: IHustlencodePost[];
  postCount: number;
}

// base API path for api requests
const BASE_URL = `/hustlencode/posts`;

/**
 * Makes API request for users posts
 * @returns
 */
export const getProfilePostsApi = async (id: string, num: number): Promise<IHustlenCodePostPayload> => {
  const url = `${BASE_URL}?id=${id}&count=${num}`;

  const response = await axiosInstance.get<any>(url);

  return response.data.payload;
};

/**
 * Makes API request for post data
 * @param id: The post _id
 * @returns
 * - Hustle n code post
 */
export const getPostApi = async (id: string): Promise<IHustlencodePost> => {
  const url = `${BASE_URL}/single/${id}`;

  const response = await axiosInstance.get<any>(url);

  return response.data.payload;
};

/**
 * Makes API request to update post
 * @param id
 * @returns
 * - Server response which contains 
 * the updated post data and success
 * message
 */
export const updatePostApi = async (id: string, payload: UpdateHustlencodePostDto): Promise<IServerResponse> => {
  const url = `${BASE_URL}/single/${id}`;

  const response = await axiosInstance.put<any>(url, payload);

  return response.data;
};

/**
 * Makes API request to delete post
 * @param id
 * @param payload
 * @returns
 */
export const deletePostApi = async (id: string): Promise<IServerResponse> => {
  const url = `${BASE_URL}/single/${id}`;

  const response = await axiosInstance.delete<any>(url);

  return response.data;
};

/**
 * Makes API request to create post
 * @param payload Post code data
 * @returns 
 * - Server response which contains 
 * the newly created post data and success
 * message
 */
export const createPostApi = async (payload: CreateHustlencodePostDto): Promise<IServerResponse> => {
  const url = `${BASE_URL}/single/`;

  const response = await axiosInstance.post<any>(url, payload);

  return response.data;
};
