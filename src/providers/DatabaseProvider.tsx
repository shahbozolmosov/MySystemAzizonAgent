import React, {useEffect} from 'react';
import {getDBConnection} from '../database/sqlite.ts';
import {createCustomersTable} from '../database/tables/customers.table.ts';
import {getAllCustomers} from '../database/customers.ts';

type DatabaseProviderProps = {
  children: React.ReactNode;
};

const DatabaseProvider = ({children}: DatabaseProviderProps) => {
  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createCustomersTable(db);
        loadUsers(db);
      } catch (err) {
        console.error('Failed to initialize database', err);
      }
    };

    initDB();
  }, []);

  const loadUsers = async (db: any) => {
    const userList = await getAllCustomers(db);
    console.log('🎉🎉🎉 userList------------------', userList);
  };

  return <>{children}</>;
};

export default DatabaseProvider;
