import SQLite from 'react-native-sqlite-storage';

// Create DayTable
export const createDayTable = async (
    db: SQLite.SQLiteDatabase,
): Promise<'ok' | null> => {
    const query = `
      CREATE TABLE IF NOT EXISTS Day (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `;

    try {
        await db.executeSql(query);
        console.log('🎉Day table created successfully');
        return 'ok';
    } catch (error) {
        console.error('❌Error creating Day table: ', error);
        return null;
    }
};

// Remove DayTable
export const removeDayTable = async (db: SQLite.SQLiteDatabase) => {
    const query = `DROP TABLE IF EXISTS Day;`;

    try {
        await db.executeSql(query);
        console.log('Day table deleted successfully');
    } catch (error) {
        console.log('Error deleting Day table: ', error);
    }
};
