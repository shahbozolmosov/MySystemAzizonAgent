import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {TDate} from '../../../types/types';
import {apiSlice} from '../apiSlice';

// Report
interface ReportGetCustomer {
    id: string;
    fio: string;
    telefon: string;
    telefon2: string;
    telefon3: string;
    korxona: string;
    balans: string;
    rasm: null;
    manzil: string;
    lokatsiya: string;
    latitude: string;
    longitude: string;
    vaqt: string;
    viloyat_id: string;
    tuman_id: string;
    yaqin_muddat: string;
    category_id: string;
    dostavka_id: string;
    client_type: string;
    chek_tartib: string;
    agent_id: string;
    mijoz_turkum_id: string;
    start_qoldiq: string;
    status: string;
    noravshanlik_koefsenti: string;
    limit_summa: string;
}
export interface ReportGetAktItem {
    key: number;
    id: string;
    summa: number;
    debit: 0;
    vozvrat: 0;
    kredit: number;
    status: string;
    sana: string;
    date: null;
    vaqt: string;
    izoh: null;
}
interface ReportGetRes extends IApiRes {
    data: {
        eski_balans: number;
        client: ReportGetCustomer;
        akt: ReportGetAktItem[];
        jamidebit: number;
        jamikredit: number;
        jamitolov: number;
        jamivozvratsumma: number;
        saldo: number;
        jamimassa: number;
        jamiqaytarilgan: number;
        jamipaterya: number;
        jamitozamassa: number;
    };
}
export interface ReportGetParams {
    customerId: string;
    date: TDate;
}

const REPORT_TAG = 'REPORT';
const customerReportApi = apiSlice
    .enhanceEndpoints({addTagTypes: [REPORT_TAG]})
    .injectEndpoints({
        endpoints: builder => ({
            // Report
            getReportsGet: builder.query<ReportGetRes, ReportGetParams>({
                query: params => allUrls.customerReportGet(params),
            }),
        }),
    });

export const {useGetReportsGetQuery} = customerReportApi;
