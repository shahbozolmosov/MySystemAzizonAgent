import SQLite from 'react-native-sqlite-storage';
import {OrderAdd} from '../app/services/order/order';
import {OrderDraft} from './tables/orderDraft.table';

export const addOrderDraft = async (
  db: SQLite.SQLiteDatabase,
  order: OrderAdd,
): Promise<'ok' | null> => {
  const {client_id, product_list, izoh, izoh_dostavka, alohida, lat, lon} =
    order;

  const query = `
    INSERT INTO OrderDrafts (client_id, product_list, izoh, izoh_dostavka, alohida, lat, lon, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
  `;

  try {
    await db.executeSql(query, [
      client_id,
      JSON.stringify(product_list),
      izoh,
      izoh_dostavka,
      alohida ? 1 : 0,
      lat,
      lon,
    ]);
    console.log('OrderDraft added successfully');
    return 'ok';
  } catch (error) {
    console.error('Error adding OrderDraft: ', error);
    return null;
  }
};

export const getOrderDraftAll = async (db: SQLite.SQLiteDatabase) => {
  const query = `SELECT * FROM OrderDrafts;`;

  try {
    const results = await db.executeSql(query);
    const orderDrafts = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      const item = results[0].rows.item(i);
      item.product_list = JSON.parse(item.product_list);
      orderDrafts.push(item);
    }
    return orderDrafts;
  } catch (error) {
    console.error('Error fetching OrderDrafts: ', error);
  }
};

export const getOrderDraftsByClientId = async (
  db: SQLite.SQLiteDatabase,
  client_id: string,
) => {
  const query = `SELECT * FROM OrderDrafts WHERE client_id = ?;`;

  try {
    const results = await db.executeSql(query, [client_id]);
    const orderDrafts = [];

    for (let i = 0; i < results[0].rows.length; i++) {
      const item = results[0].rows.item(i);
      item.product_list = JSON.parse(item.product_list);
      orderDrafts.push(item);
    }

    return orderDrafts;
  } catch (error) {
    console.error('Error fetching OrderDrafts by client_id: ', error);
    throw error;
  }
};

export const getOrderDraftById = async (
  db: SQLite.SQLiteDatabase,
  orderId: string,
) => {
  const query = `SELECT * FROM OrderDrafts WHERE uid = ?;`;

  try {
    const results = await db.executeSql(query, [orderId]);
    if (results[0].rows.length > 0) {
      const order = results[0].rows.item(0);
      order.product_list = JSON.parse(order.product_list);
      return order;
    } else {
      console.log('OrderDraft not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching OrderDraft: ', error);
  }
};

export const removeOrderDraftById = async (
  db: SQLite.SQLiteDatabase,
  orderId: number,
) => {
  const query = `DELETE FROM OrderDrafts WHERE uid = ?;`;

  try {
    await db.executeSql(query, [orderId]);
    console.log(`OrderDraft with id ${orderId} deleted successfully`);
  } catch (error) {
    console.log('Error deleting OrderDraft: ', error);
  }
};

export const removeAllOrderDraft = async (db: SQLite.SQLiteDatabase) => {
  const query = `DELETE FROM OrderDrafts;`;

  try {
    await db.executeSql(query);
    console.log('All OrderDrafts deleted successfully');
  } catch (error) {
    console.log('Error deleting all OrderDrafts: ', error);
  }
};

export const updateOrderDraft = async (
  db: SQLite.SQLiteDatabase,
  uid: number,
  updates: Partial<OrderDraft>,
) => {
  const {client_id, product_list, izoh, izoh_dostavka, alohida, lat, lon} =
    updates;

  const query = `
    UPDATE OrderDrafts
    SET
      client_id = COALESCE(?, client_id),
      product_list = COALESCE(?, product_list),
      izoh = COALESCE(?, izoh),
      izoh_dostavka = COALESCE(?, izoh_dostavka),
      alohida = COALESCE(?, alohida),
      lat = COALESCE(?, lat),
      lon = COALESCE(?, lon),
      updated_at = datetime('now') -- Yozuv yangilangan vaqti
    WHERE uid = ?;
  `;

  try {
    await db.executeSql(query, [
      client_id,
      JSON.stringify(product_list),
      izoh,
      izoh_dostavka,
      alohida ? 1 : 0,
      lat,
      lon,
      uid,
    ]);
    console.log('OrderDraft updated successfully');
  } catch (error) {
    console.error('Error updating OrderDraft: ', error);
  }
};
