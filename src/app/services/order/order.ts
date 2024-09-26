import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {api} from '../api';
import {ICustomer} from '../customer/customer';

interface OrderProduct {
  id: string;
  name: string;
  article: string;
  massa: '1';
  tayyorlandi: '0';
  price: '59800';
  real_price: '59800';
}

interface Order {
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
  tolov_summa: string;
  product_list: OrderProduct[];
  after_balans: number;
}

// index
interface OrderAllRes extends IApiRes {
  data: Order[];
}

// post
interface OrderAddProduct {
  product_id: string;
  aritcle: string;
  massa: number;
  price: number;
  price_chegirma: number;
}

interface OrderAdd {
  client_id: number;
  product_list: OrderAddProduct[];
  izoh: string;
  izoh_dostavka: string;
  alohida: boolean;
  lat: number;
  lon: number;
}
interface OrderAddRes extends IApiRes {}

const PRODUCT_TAG = 'PRODUCT_TAG';

export const productApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // Index
      getProductAll: build.query<OrderAllRes, void>({
        query: () => allUrls.orderGetAll,
      }),

      // Post
      addProductOrder: build.query<OrderAddRes, OrderAdd>({
        query: body => ({
          url: allUrls.orderAdd,
          method: 'POST',
          body,
        }),
      }),
    }),
  });

export const {useGetProductAllQuery} = productApi;
