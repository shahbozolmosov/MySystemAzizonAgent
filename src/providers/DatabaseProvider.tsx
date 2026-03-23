import React, {useCallback, useEffect} from 'react';
import {getDBConnection} from '../database/sqlite.ts';
import {createCustomersTable} from '../database/tables/customers.table.ts';
import {getAllCustomers} from '../database/customers.ts';
import {useDispatch} from 'react-redux';
import {
  starterSyncOff,
  starterSyncOn,
} from '../app/services/starter/starterSlice.ts';
import AppLoader from '../components/common/AppLoader/AppLoader.tsx';

type DatabaseProviderProps = {
  children: React.ReactNode;
};

const DatabaseProvider = ({children}: DatabaseProviderProps) => {
  // State
  const [isLoading, setIsLoading] = React.useState(true);

  // Dispatch
  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    async (db: any) => {
      const customers = await getAllCustomers(db);
      if (customers && customers.length !== 0) {
        dispatch(starterSyncOn());
      } else {
        dispatch(starterSyncOff());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const initDB = async () => {
      setIsLoading(true);
      try {
        const db = await getDBConnection();
        await createCustomersTable(db);
        await loadCustomers(db);
      } catch (err) {
        console.error('Failed to initialize database', err);
      } finally {
        setIsLoading(false);
      }
    };

    initDB();
  }, [loadCustomers]);

  if (isLoading) {
    return <AppLoader />;
  }

  return <>{children}</>;
};

export default DatabaseProvider;
