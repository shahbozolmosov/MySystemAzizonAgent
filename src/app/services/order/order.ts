import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {api} from '../api';
import {ICustomer} from '../customer/customer';

export interface OrderProduct {
  id: string;
  name: string;
  article: string;
  massa: number;
  price: number;
  real_price: number;
  summa: number;
  status: string;
}

export interface Order {
  id: string;
  client: ICustomer;
  sana: string;
  izoh: string;
  agent: string;
  dostavchik: string;
  dostavka_id: string;
  dostavchik_telefon: string;
  status: string;
  vaqt: string;
  old_client_balans: string;
  belgilangan_chegirma: string;
  mahsulot_soni: number;
  buyurtma_massa: number;
  jami_massa: number;
  taxmin_summa: number;
  tasdiqlangan_summa: number;
  taxmin_chegirma: number;
  tasdiqlangan_chegirma: number;
  tolov_summa: number;
  product_list: OrderProduct[];
  after_balans: number;
}

// index
export type OrderAllParams = {
  customerId?: string;
  status?: 'new' | 'bekor_qilingan' | 'jarayonda' | 'topshirildi' | '';
};

interface OrderAllRes extends IApiRes {
  data: Order[];
}

// Show
interface OrderGetByIdRes extends IApiRes {
  data: Order;
}

// post
interface OrderAddProduct {
  product_id: string;
  aritcle: string;
  massa: number;
  price: number;
  price_chegirma: number;
}

export interface OrderAdd {
  client_id: string;
  product_list: OrderAddProduct[];
  izoh: string;
  izoh_dostavka: string;
  alohida: boolean;
  lat: number;
  lon: number;
}

interface OrderAddRes extends IApiRes {}

const PRODUCT_ORDER_TAG = 'PRODUCT_ORDER';

export const productOrderApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_ORDER_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // Index
      getProductOrderAll: build.query<OrderAllRes, OrderAllParams>({
        query: params => allUrls.orderGetAll(params),
        providesTags: [PRODUCT_ORDER_TAG],
      }),

      // Show
      getProductById: build.query<OrderGetByIdRes, string>({
        query: id => allUrls.orderGetById(id),
        providesTags: [PRODUCT_ORDER_TAG],
      }),

      // Post
      addProductOrder: build.mutation<OrderAddRes, OrderAdd>({
        query: body => ({
          url: allUrls.orderAdd,
          method: 'POST',
          body,
        }),
        invalidatesTags: [PRODUCT_ORDER_TAG],
      }),
    }),
  });

export const {
  useGetProductOrderAllQuery,
  useGetProductByIdQuery,
  useAddProductOrderMutation,
} = productOrderApi;

export const {
  endpoints: {addProductOrder},
} = productOrderApi;
