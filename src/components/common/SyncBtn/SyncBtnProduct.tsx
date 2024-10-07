import {SpeedDial} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {ICustomer} from '../../../app/services/customer/customer';
import {useGetProductAllQuery} from '../../../app/services/product/product';
import {
  addMultipleCustomers,
  deleteAllCustomers,
} from '../../../database/customers';
import {getDBConnection} from '../../../database/sqlite';
import {createCustomersTable} from '../../../database/tables/customers.table';
import {handleApiResponse} from '../../../utils/handleApiResponse';

type SyncBtnProductProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SyncBtnProduct = ({loading, setLoading}: SyncBtnProductProps) => {
  // State
  const [fetchData, setFetchData] = useState(false);

  // API
  const productRes = useGetProductAllQuery(
    {},
    {
      skip: !fetchData,
    },
  );

  const productData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(productRes);
  }, [productRes]);

  const handleSync = useCallback(async () => {
    setLoading(true);
    setFetchData(true);

    try {
      const db = await getDBConnection();
      // Create tables
      await createCustomersTable(db);
      await deleteAllCustomers(db);
      await addMultipleCustomers(db, productData);

      Toast.show({
        type: 'success',
        text1: 'Muvaffaqiyatli',
        text2: 'Mahsulotlar muvaffaqiyatli sinxronlandi',
      });
    } catch (err) {
      console.error('Failed to initialize database', err);
    } finally {
      setLoading(false);
    }
  }, [productData, setLoading]);

  return (
    <SpeedDial.Action
      icon={<Icon name={'box'} size={20} color={'#ffffff'} />}
      title="Mahsulotlar"
      onPress={handleSync}
      loading={loading}
    />
  );
};

export default React.memo(SyncBtnProduct);
