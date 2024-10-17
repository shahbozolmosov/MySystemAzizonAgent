import {OrderAllParams} from '../app/services/order/order';
import {TDate} from '../types/types';
import {ProductAllParam} from '../app/services/product/product.ts';
import {ReportGetParams} from '../app/services/customerReport/customerReport.ts';

export const baseUrl = 'https://azizon-system.uz/api-demo';

export const authUrls = {
    login: '/user/login.php',
};

export const userUrls = {
    show: '/user/get-user.php',
};

export const allUrls = {
    // Dashboard
    dashboardGet: (date: TDate) =>
        `/agent/get-index-data.php?sana1=${date.start}&sana2=${date.end}`,

    // Customer
    customerGetAll: '/agent/get-clients.php',
    customerGetById: (id: string) => `/agent/get-clients.php?id=${id}`,
    customerGetCategory: '/agent/get-client-category.php',
    customerAdd: '/agent/add-client.php',

    // Supplier
    supplierGetAll: '/agent/get-dostavka.php',

    // Region
    regionGetAll: '/agent/get-viloyat.php',
    districtGetByRegion: (regionId: string) =>
        `/agent/get-tuman.php?viloyat_id=${regionId}`,

    // Product
    productsGetAll: ({customerId = ''}: ProductAllParam) =>
        `/agent/get-products.php?customerId=${customerId}`,

    // Category
    categoryGetAll: '/agent/get-category.php',

    // Order
    orderGetAll: ({customerId = '', status = ''}: OrderAllParams) =>
        `/agent/get-my-orders.php?client_id=${customerId}&status=${status}`,
    orderGetById: (id: string) => `/agent/get-my-orders.php?id=${id}`,
    orderGetByDate: (date: TDate) =>
        `/agent/get-my-orders.php?sana1=${date.end}&sana2=${date.end}`,

    orderAdd: '/agent/add-sale-order.php',
    orderItemUpdate: (orderId: string) =>
        `/agent/edit-sale-order.php?order_id=${orderId}`,
    orderDelete: (orderId: string) => `agent/get-my-orders.php?id=${orderId}`,
    orderItemDelete: (orderItemId: string) =>
        `/agent/get-my-orders.php?order_item_id=${orderItemId}`,

    // Day customer
    dayCustomerGet: (dayId: string) => `/agent/get-clients.php?day_id=${dayId}`,
    customerAddToDayAdd: 'agent/add-client-days.php',
    dayAddToCustomerAdd: '/agent/add-days-client.php',
    dayCustomerDelete: '/agent/remove-client-day.php',

    // Visit
    visitAdd: '/agent/add-tashrif.php',

    // Reports
    customerReportGet: ({customerId, date}: ReportGetParams) =>
        `/sotuv/get-mijoz-report.php?client_id=${customerId}&sana1=${date.start}&sana2=${date.end}`,
};
