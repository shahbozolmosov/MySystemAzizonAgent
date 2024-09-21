import {allUrls} from '../../../constants/api';
import {api} from '../api';

const PRODUCT_TAG = 'PRODUCT_TAG';

export const productApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // index
      getProductAll: build.query({
        query: () => allUrls.productsGetAll,
      }),
    }),
  });

export const {useGetProductAllQuery} = productApi;
