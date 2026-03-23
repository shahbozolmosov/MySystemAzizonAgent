import SQLite from 'react-native-sqlite-storage';

export const createUserTable = async (
  db: SQLite.SQLiteDatabase,
): Promise<'ok' | null> => {
  const query = `
    CREATE TABLE IF NOT EXISTS User (
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT UNIQUE NOT NULL,
      rol TEXT NOT NULL,
      familya TEXT,
      ism TEXT,
      rasm TEXT,
      telefon TEXT,
      email TEXT,
      tashkilot_id TEXT,
      dukon_id TEXT,
      bulim_id TEXT,
      token TEXT,
      status TEXT NOT NULL
    );
  `;

  try {
    await db.executeSql(query);
    console.log('🎉User table created successfully');
    return 'ok';
  } catch (error) {
    console.error('❌Error creating User table: ', error);
    return null;
  }
};

export const removeUserTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS User;`;

  try {
    await db.executeSql(query);
    console.log('User table deleted successfully');
  } catch (error) {
    console.log('Error deleting User table: ', error);
  }
};
