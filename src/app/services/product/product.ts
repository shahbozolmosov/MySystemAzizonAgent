import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {api} from '../api';

export interface Product {
  id: string;
  name: string;
  article: string;
  nagruzka: number;
  pishirish: number;
  price: number;
  real_price: number;
  category_id: string;
  before_ordered: false;
}

// index
interface ProductAllParam {
  customerId: string;
}
interface ProductAllRes extends IApiRes {
  data: Product[];
}

const PRODUCT_TAG = 'PRODUCT_TAG';

export const productApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // Index
      getProductAll: build.query<ProductAllRes, ProductAllParam>({
        query: ({customerId}) => allUrls.productsGetByCustomer(customerId),
      }),
    }),
  });

export const {useGetProductAllQuery} = productApi;
