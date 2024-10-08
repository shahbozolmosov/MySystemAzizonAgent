import SQLite from 'react-native-sqlite-storage';
import {Product} from '../../app/services/product/product';

export interface OrderDraftProduct extends Product {
  inputAmount: string;
}

export interface OrderDraft {
  uid: number;
  client_id: string;
  product_list: OrderDraftProduct[];
  izoh: string;
  izoh_dostavka: string;
  alohida: boolean;
  lat: number;
  lon: number;
  created_at: string;
  updated_at: string;
}

export interface AddOrderDraft {
  client_id: string;
  product_list: OrderDraftProduct[];
  izoh: string;
  izoh_dostavka: string;
  alohida: boolean;
  lat: number;
  lon: number;
}

export const createOrdersDraftTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS OrderDrafts (
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id TEXT NOT NULL,
      product_list TEXT NOT NULL,
      izoh TEXT,
      izoh_dostavka TEXT,
      alohida BOOLEAN NOT NULL DEFAULT FALSE,
      lat REAL,
      lon REAL,
      created_at TEXT DEFAULT (datetime('now')), -- Yozuv yaratish vaqti
      updated_at TEXT DEFAULT (datetime('now'))  -- Yozuvni yangilash vaqti
    );
  `;

  try {
    await db.executeSql(query);
    console.log('OrderDrafts table created successfully');
  } catch (error) {
    console.error('Error creating OrderDrafts table: ', error);
  }
};

export const removeOrdersDraftTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS OrderDrafts;`;

  try {
    await db.executeSql(query);
    console.log('OrderDrafts table deleted successfully');
  } catch (error) {
    console.log('Error deleting OrderDrafts table: ', error);
  }
};
