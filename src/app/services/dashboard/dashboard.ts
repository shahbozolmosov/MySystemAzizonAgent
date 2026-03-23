import {allUrls} from '../../../constants/api';
import {IApiRes} from '../../../types/api';
import {TDate} from '../../../types/types.ts';
import {apiSlice} from '../apiSlice.ts';

// Show
export interface DashboardItem {
    id: 1;
    name: string;
    value: number;
    icon_key: string;
    status: string;
}
interface DashboardRes extends IApiRes {
    data: DashboardItem;
}

const DASHBOARD_TAG = 'DASHBOARD_TAG';

export const dashboardApi = apiSlice
    .enhanceEndpoints({addTagTypes: [DASHBOARD_TAG]})
    .injectEndpoints({
        endpoints: build => ({
            // Show
            getDashboard: build.query<DashboardRes, TDate>({
                query: (date) => allUrls.dashboardGet(date),
                providesTags: [DASHBOARD_TAG],
            }),
            // Update
            // Update password
            // Logout
        }),
    });

export const {useGetDashboardQuery} = dashboardApi;

export const {
    endpoints: {getDashboard},
} = dashboardApi;
