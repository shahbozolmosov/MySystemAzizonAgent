import SQLite from 'react-native-sqlite-storage';

export const createOrdersTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS Orders (
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      id TEXT UNIQUE NOT NULL,
      client TEXT NOT NULL, -- JSON sifatida saqlanadi
      customer_id TEXT NOT NULL,
      sana TEXT NOT NULL,
      izoh TEXT,
      agent TEXT,
      dostavchik TEXT,
      dostavka_id TEXT,
      dostavchik_telefon TEXT,
      status TEXT,
      vaqt TEXT,
      old_client_balans TEXT,
      belgilangan_chegirma TEXT,
      mahsulot_soni INTEGER,
      buyurtma_massa REAL,
      jami_massa REAL,
      taxmin_summa REAL,
      tasdiqlangan_summa REAL,
      taxmin_chegirma REAL,
      tasdiqlangan_chegirma REAL,
      tolov_summa REAL,
      product_list TEXT NOT NULL, -- JSON sifatida saqlanadi
      after_balans REAL
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
    console.error('Error deleting Orders table: ', error);
  }
};
