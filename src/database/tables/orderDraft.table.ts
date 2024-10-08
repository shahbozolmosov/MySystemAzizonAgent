import SQLite from 'react-native-sqlite-storage';

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
      lon REAL
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
