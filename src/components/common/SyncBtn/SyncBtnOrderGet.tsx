import {SpeedDial} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {
  Order,
  useGetProductOrderAllQuery,
} from '../../../app/services/order/order';
import {addMultipleOrders, deleteAllOrders} from '../../../database/order';
import {getDBConnection} from '../../../database/sqlite';
import {createCustomersTable} from '../../../database/tables/customers.table';
import {handleApiResponse} from '../../../utils/handleApiResponse';

type SyncBtnOrderGetProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SyncBtnOrderGet = ({loading, setLoading}: SyncBtnOrderGetProps) => {
  // State
  const [fetchData, setFetchData] = useState(false);

  // API
  const orderRes = useGetProductOrderAllQuery(
    {},
    {
      skip: !fetchData,
    },
  );

  const orderData = useMemo<Order[]>(() => {
    return handleApiResponse<Order[]>(orderRes);
  }, [orderRes]);

  const handleSync = useCallback(async () => {
    setFetchData(true);

    if (!orderData.length) {
      return;
    }

    setLoading(true);
    try {
      const db = await getDBConnection();
      // Create tables
      await createCustomersTable(db);
      await deleteAllOrders(db);
      await addMultipleOrders(db, orderData);

      Toast.show({
        type: 'success',
        text1: 'Muvaffaqiyatli',
        text2: 'Buyurtmalar muvaffaqiyatli sinxronlandi',
      });
    } catch (err) {
      console.error('Failed to initialize database', err);
    } finally {
      setLoading(false);
    }
  }, [orderData, setLoading]);

  return (
    <SpeedDial.Action
      icon={<Icon name={'inbox'} size={20} color={'#ffffff'} />}
      title="Buyurtmalar"
      onPress={handleSync}
      loading={loading}
    />
  );
};

export default React.memo(SyncBtnOrderGet);
