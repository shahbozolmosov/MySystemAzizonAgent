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

// index category
export interface ICustomerCategory {
  id: string;
  name: string;
  turkum_id: string;
}

interface ICustomerCategoryRes extends IApiRes {
  data: ICustomerCategory[];
}

// index supplier
export interface Supplier {
  id: string;
  dostavchik: string;
}

interface SupplierRes extends IApiRes {
  data: Supplier[];
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

interface ICustomerAddRes extends IApiRes {}

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
      // Index category
      getCustomerCategory: build.query<ICustomerCategoryRes, void>({
        query: () => allUrls.customerGetCategory,
      }),
      // Index supplier
      getCustomerSupplier: build.query<SupplierRes, void>({
        query: () => allUrls.supplierGetAll,
      }),
      // Show
      getCustomerById: build.query<ICustomerByIdRes, string>({
        query: id => allUrls.customerGetById(id),
      }),
      // Post
      addCustomer: build.mutation<ICustomerAddRes, ICustomerAdd>({
        query: body => ({
          url: allUrls.customerAdd,
          method: 'POST',
          body,
        }),
      }),
    }),
  });

export const {
  useGetCustomerAllQuery,
  useGetCustomerCategoryQuery,
  useGetCustomerSupplierQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation
} = customerApi;
