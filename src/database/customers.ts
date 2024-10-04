import SQLite from 'react-native-sqlite-storage';
import {ICustomer} from '../app/services/customer/customer.ts';

// Add customer
export const addCustomer = async (
  db: SQLite.SQLiteDatabase,
  customer: ICustomer,
) => {
  const {
    fio,
    korxona,
    balans,
    telefon,
    rasm,
    manzil,
    lokatsiya,
    latitude,
    registertime,
    viloyat,
    tuman,
    category_id,
    dostavka_id,
    viloyat_id,
    tuman_id,
    agent_id,
  } = customer;

  const query = `
    INSERT INTO Customers (fio, korxona, direktor, direktor_telefon, telegram_id, balans, telefon, rasm, manzil, lokatsiya, latitude, registertime, viloyat, tuman, category_id, dostavka_id, viloyat_id, tuman_id, agent_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(query, [
      fio,
      korxona,
      balans,
      telefon,
      rasm,
      manzil,
      lokatsiya,
      latitude,
      registertime,
      viloyat,
      tuman,
      category_id,
      dostavka_id,
      viloyat_id,
      tuman_id,
      agent_id,
    ]);
    console.log('Customer added successfully');
  } catch (error) {
    console.error('Error adding customer: ', error);
  }
};

// Add multiple customers
export const addMultipleCustomers = async (
  db: SQLite.SQLiteDatabase,
  customers: ICustomer[],
): Promise<void> => {
  const query = `
    INSERT INTO Customers (
      customer_id, 
      fio,
      korxona,
      direktor,
      direktor_telefon,
      telegram_id,
      balans,
      telefon,
      rasm,
      manzil,
      lokatsiya,
      latitude,
      registertime,
      viloyat,
      tuman,
      category_id,
      dostavka_id,
      viloyat_id,
      tuman_id,
      agent_id
   ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); 
  `;

  try {
    await db.transaction(tx => {
      for (const customer of customers) {
        const {
          id,
          fio,
          korxona,
          direktor,
          direktor_telefon,
          telegram_id,
          balans,
          telefon,
          rasm,
          manzil,
          lokatsiya,
          latitude,
          registertime,
          viloyat,
          tuman,
          category_id,
          dostavka_id,
          viloyat_id,
          tuman_id,
          agent_id,
        } = customer;
        tx.executeSql(
          query,
          [
            id,
            fio,
            korxona,
            direktor,
            direktor_telefon,
            telegram_id,
            balans,
            telefon,
            rasm,
            manzil,
            lokatsiya,
            latitude,
            registertime,
            viloyat,
            tuman,
            category_id,
            dostavka_id,
            viloyat_id,
            tuman_id,
            agent_id,
          ],
          () => {
            console.log(`Customer ${fio} added successfully`);
          },
          (txObj, error) => {
            console.error(`Error adding customer ${fio}: `, error);
            return false; // stop the transaction on error
          },
        );
      }
    });
    console.log('Multiple customers added successfully');
  } catch (error) {
    console.error('Error adding multiple customers: ', error);
  }
};
// Get one customer
export const getCustomerById = async (
  db: SQLite.SQLiteDatabase,
  customerId: string,
) => {
  const query = `SELECT * FROM Customers WHERE customer_id = ?;`;

  try {
    const results = await db.executeSql(query, [customerId]);
    if (results[0].rows.length > 0) {
      return results[0].rows.item(0);
    } else {
      console.log('Customer not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching customer: ', error);
  }
};

// Get all customers
export const getAllCustomers = async (db: SQLite.SQLiteDatabase) => {
  const query = `SELECT * FROM Customers;`;

  try {
    const results = await db.executeSql(query);
    const customers = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      customers.push(results[0].rows.item(i));
    }
    return customers;
  } catch (error) {
    console.error('Error fetching customers: ', error);
  }
};

// Delete all customers
export const deleteAllCustomers = async (db: SQLite.SQLiteDatabase) => {
  const query = `DELETE FROM Customers;`;

  try {
    await db.executeSql(query);
    console.log('All customers deleted successfully');
  } catch (error) {
    console.log('Error deleting customer: ', error);
  }
};
