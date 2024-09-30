import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {apiSlice} from '../apiSlice.ts';

export interface ICustomer {
  id: string;
  fio: string;
  korxona: string;
  balans: 0;
  telefon: string;
  rasm: null;
  manzil: string;
  lokatsiya: string;
  latitude: string;
  registertime: string;
  viloyat: string;
  tuman: string;
  category_id: string;
  dostavka_id: string;
  viloyat_id: string;
  tuman_id: string;
  agent_id: string;
  bonuslar: [];
  chegirma: null;
}

// index
interface ICustomerRes extends IApiRes {
  data: ICustomer[];
}

// show
interface ICustomerByIdRes extends IApiRes {
  data: ICustomer;
}

// post
export interface ICustomerAdd {
  fio: string;
  telefon: string;
  direktor: string;
  direktor_telefon: string;
  telegram_id: number | '';
  korxona: string;
  manzil: string;
  lokatsiya: string;
  latitude: number | '';
  longitude: number | '';
  viloyat_id: string;
  tuman_id: string;
  category_id: string;
  dostavka_id: string;
}

// TAG
const CUSTOMER_TAG = 'CUSTOMER_TAG';

export const customerApi = apiSlice
  .enhanceEndpoints({addTagTypes: [CUSTOMER_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // Index
      getCustomerAll: build.query<ICustomerRes, void>({
        query: () => allUrls.customerGetAll,
      }),
      // Show
      getCustomerById: build.query<ICustomerByIdRes, string>({
        query: id => allUrls.customerGetById(id),
      }),
      // Post
    }),
  });

export const {useGetCustomerAllQuery, useGetCustomerByIdQuery} = customerApi;
