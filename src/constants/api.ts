import {TDate} from '../types/types';

export const baseUrl = 'https://azizon-system.uz/api-demo';

export const authUrls = {
  login: '/user/login.php',
};

export const userUrls = {
  show: '/user/get-user.php',
};

export const allUrls = {
  // Customer
  customerGetAll: '/agent/get-clients.php',
  customerGetById: (id: string) => `/agent/get-clients.php?id=${id}`,
  customerGetByCategory: '/agent/get-client-category.php',

  // Supplier
  supplierGetAll: '/agent/get-dostavka.php',

  // Region
  regionGetAll: '/agent/get-viloyat.php',
  districtGetByRegion: (regionId: string) =>
    `/agent/get-tuman.php?viloyat_id=${regionId}`,

  // Product
  productsGetAll: 'agent/get-products.php',
  productsGetByCustomer: (customerId: string) =>
    `/agent/get-products.php?client_id=${customerId}`,

  // Category
  categoryGetAll: '/agent/get-category.php',

  // Order
  orderGetAll: '/agent/get-my-orders.php',
  orderGetById: (orderId: string) => `/agent/get-my-orders.php?id=${orderId}`,
  orderGetByDate: (date: TDate) =>
    `/agent/get-my-orders.php?sana1=${date.end}&sana2=${date.end}`,
  orderGetByCustomer: (customerId: string) =>
    `/agent/get-my-orders.php?client_id=${customerId}`,
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
};
