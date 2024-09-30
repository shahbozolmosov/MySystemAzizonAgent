import SQLite from 'react-native-sqlite-storage';

const datbase_name = 'MySystemAzizonAgent.db';
const database_version = '1.0';
const database_displayname = 'Offline database';
const database_size = 5242880; // 5 MB

SQLite.enablePromise(true);

export const getDBConnection = (): SQLite.SQLiteDatabase => {
  return SQLite.openDatabase(
    {
      name: datbase_name,
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    (error: any) => {
      console.log('Error opening database', error);
    },
  );
};
