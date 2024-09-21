import {allUrls} from '../../../constants/api';
import {api} from '../api';

const PRODUCT_TAG = 'PRODUCT_TAG';

export const customerApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // index
      getCustomerAll: build.query({
        query: () => allUrls.customerGetAll,
      }),
    }),
  });

export const {useGetCustomerAllQuery} = customerApi;
