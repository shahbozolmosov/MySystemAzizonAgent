import SQLite from 'react-native-sqlite-storage';

export const createOrdersTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS Orders (
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id TEXT NOT NULL,
      product_list TEXT NOT NULL,
      izoh TEXT,
      izoh_dostavka TEXT,
      alohida BOOLEAN NOT NULL,
      lat REAL,
      lon REAL
    );
  `;

  try {
    await db.executeSql(query);
    console.log('Orders table created successfully');
  } catch (error) {
    console.error('Error creating Orders table: ', error);
  }
};

export const removeOrdersTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS Orders;`;

  try {
    await db.executeSql(query);
    console.log('Orders table deleted successfully');
  } catch (error) {
    console.log('Error deleting Orders table: ', error);
  }
};
