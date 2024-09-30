import SQLite from 'react-native-sqlite-storage';

export const createCustomersTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS Customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fio TEXT NOT NULL,
      korxona TEXT NOT NULL,
      direktor TEXT,
      direktor_telefon TEXT,
      telegram_id TEXT,
      balans REAL,
      telefon TEXT,
      rasm TEXT,
      manzil TEXT,
      lokatsiya TEXT,
      latitude REAL,
      registertime TEXT NOT NULL,
      viloyat TEXT,
      tuman TEXT,
      category_id INTEGER,
      dostavka_id INTEGER,
      viloyat_id INTEGER,
      tuman_id INTEGER,
      agent_id INTEGER
    );
  `;

  try {
    await db.executeSql(query);
    console.log("Customers table created successfully");
  } catch (error) {
    console.error("Error creating Customers table: ", error);
  }
};
