import {SpeedDial} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../../app/services/customer/customer';
import {getDBConnection} from '../../../database/sqlite';
import {createCustomersTable} from '../../../database/tables/customers.table';
import {handleApiResponse} from '../../../utils/handleApiResponse';
import {addMultipleCustomers, deleteAllCustomers} from '../../../database/customers';

type SyncBtnCustomerProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SyncBtnCustomer = ({loading, setLoading}: SyncBtnCustomerProps) => {
  // State
  const [fetchCustomer, setFetchCustomer] = useState(false);

  // API
  const customerRes = useGetCustomerAllQuery(undefined, {
    skip: !fetchCustomer,
  });

  const customerData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(customerRes);
  }, [customerRes]);

  const handleSyncCustomer = useCallback(async () => {
    setLoading(true);
    setFetchCustomer(true);

    try {
      const db = await getDBConnection();
      // Create tables
      await createCustomersTable(db);
      await deleteAllCustomers(db);
      addMultipleCustomers(db, customerData);

      Toast.show({
        type: 'success',
        text1: 'Muvaffaqiyatli',
        text2: 'Mijozlar muvaffaqiyatli sinxronlandi',
      });
    } catch (err) {
      console.error('Failed to initialize database', err);
    } finally {
      setLoading(false);
    }
  }, [customerData, setLoading]);

  return (
    <SpeedDial.Action
      icon={<Icon name={'users'} size={20} color={'#ffffff'} />}
      title="Mijozlar"
      onPress={handleSyncCustomer}
      loading={loading}
    />
  );
};

export default React.memo(SyncBtnCustomer);
