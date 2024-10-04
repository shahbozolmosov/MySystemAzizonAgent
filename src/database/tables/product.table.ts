import SQLite from 'react-native-sqlite-storage';

export const createProductsTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS Products (
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      article TEXT NOT NULL,
      nagruzka REAL NOT NULL,
      pishirish REAL NOT NULL,
      price REAL NOT NULL,
      real_price REAL NOT NULL,
      category_id INTEGER NOT NULL,
      before_ordered BOOLEAN NOT NULL DEFAULT 0
    );
  `;

  try {
    await db.executeSql(query);
    console.log('Products table created successfully');
  } catch (error) {
    console.error('Error creating Products table: ', error);
  }
};

export const removeProductsTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS Products;`;

  try {
    await db.executeSql(query);
    console.log('Products table deleted successfully');
  } catch (error) {
    console.log('Error deleting Products table: ', error);
  }
};
