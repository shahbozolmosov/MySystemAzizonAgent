import {authUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {api} from '../api';

export interface IAuthLogin {
  login: string;
  parol: string;
}

interface IAuthLoginRes extends IApiRes {
  data: {
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
  };
}

const authApi = api.injectEndpoints({
  endpoints: build => ({
    // Login
    login: build.mutation<IAuthLoginRes, IAuthLogin>({
      query: credentials => ({
        url: authUrls.login,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = authApi;

export const {
  endpoints: {login},
} = authApi;
