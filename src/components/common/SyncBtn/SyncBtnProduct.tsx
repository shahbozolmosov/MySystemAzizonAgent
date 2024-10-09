import {SpeedDial} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {
  Product,
  useGetProductAllQuery,
} from '../../../app/services/product/product';
import {
  addMultipleProducts,
  deleteAllProducts,
} from '../../../database/products';
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

  const productData = useMemo<Product[]>(() => {
    if (!productRes.isLoading && !productRes.isFetching) {
      if (productRes.isError) {
        Toast.show({
          type: 'error',
          text1: 'Ulanishda xatolik',
          text2: "Internetga ulaning va qaytadan urinib ko'ring",
        });
      } else {
        return handleApiResponse<Product[]>(productRes);
      }
    }
    return [];
  }, [productRes]);

  const handleSync = useCallback(async () => {
    setFetchData(true);

    if (!productData.length) {
      return;
    }

    setLoading(true);

    try {
      const db = await getDBConnection();
      // Create tables
      await createCustomersTable(db);
      await deleteAllProducts(db);
      await addMultipleProducts(db, productData);

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
