import SQLite from 'react-native-sqlite-storage';
import {IUser} from '../app/services/user/user.ts';

// Add user
export const addUser = async (
  db: SQLite.SQLiteDatabase,
  user: IUser,
): Promise<'ok' | null> => {
  const {
    login,
    rol,
    familya,
    ism,
    rasm,
    telefon,
    email,
    tashkilot_id,
    dukon_id,
    bulim_id,
    status,
  } = user;

  const query = `
    INSERT INTO User (login, rol, familya, ism, rasm, telefon, email, tashkilot_id, dukon_id, bulim_id, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(query, [
      login,
      rol,
      familya,
      ism,
      rasm,
      telefon,
      email,
      tashkilot_id,
      dukon_id,
      bulim_id,
      status,
    ]);
    console.log('✅ User added successfully');
    return 'ok';
  } catch (error) {
    console.error('❌ Error adding user: ', error);
    return null;
  }
};

// Get user
export const getUser = async (db: SQLite.SQLiteDatabase) => {
  const query = `SELECT * FROM User`;

  try {
    const results = await db.executeSql(query);
    if (results[0].rows.item(0)) {
      return results[0].rows.item(0);
    } else {
      console.log('❌User not found');
      return null;
    }
  } catch (err) {
    console.error('❌Failed to initialize database', err);
  }
};

// Get user by login
export const getUserByLogin = async (
  db: SQLite.SQLiteDatabase,
  userLogin: string,
) => {
  const query = `SELECT * FROM User WHERE login = ?;`;

  try {
    const results = await db.executeSql(query, [userLogin]);
    if (results[0].rows.length > 0) {
      return results[0].rows.item(0);
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user: ', error);
  }
};

// Delete all users
export const deleteAllUsers = async (db: SQLite.SQLiteDatabase) => {
  const query = `DELETE FROM User;`;

  try {
    await db.executeSql(query);
    console.log('All users deleted successfully');
  } catch (error) {
    console.error('Error deleting all users: ', error);
  }
};
