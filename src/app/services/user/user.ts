import {userUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {apiSlice} from '../apiSlice.ts';

const USER_TAG = 'USER';

// Show
export interface IUser {
  login: string;
  rol: string;
  familya: string;
  ism: string;
  rasm: string;
  telefon: string;
  email: string;
  tashkilot_id: string;
  dukon_id: string;
  bulim_id: string;
  token: string;
  status: string;
}
interface IUserRes extends IApiRes {
  data: IUser;
}

export const userApi = apiSlice
  .enhanceEndpoints({addTagTypes: [USER_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // Show
      getUser: build.query<IUserRes, void>({
        query: () => userUrls.show,
        providesTags: [USER_TAG],
      }),
      // Update
      // Update password
      // Logout
    }),
  });

export const {useGetUserQuery} = userApi;

export const {
  endpoints: {getUser},
} = userApi;
