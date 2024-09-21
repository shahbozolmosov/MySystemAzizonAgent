import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {api} from '../api';

const PRODUCT_TAG = 'PRODUCT_TAG';

interface ICustomer {
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

export const customerApi = api
  .enhanceEndpoints({addTagTypes: [PRODUCT_TAG]})
  .injectEndpoints({
    endpoints: build => ({
      // index
      getCustomerAll: build.query<ICustomerRes, void>({
        query: () => allUrls.customerGetAll,
      }),
    }),
  });

export const {useGetCustomerAllQuery} = customerApi;
