import React, {useCallback} from 'react';
import {SpeedDial} from '@rneui/themed';
import {getDBConnection} from '../../../database/sqlite.ts';
import {getAllCustomers} from '../../../database/customers.ts';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import SyncBtnCustomer from './SyncBtnCustomer.tsx';
import SyncBtnProduct from './SyncBtnProduct.tsx';

const SyncBtn = () => {
  const [open, setOpen] = React.useState(false);

  const [customerLoading, setCustomerLoading] = React.useState(false);
  const [productLoading, setProductLoading] = React.useState(false);
  const [orderLoading, setOrderLoading] = React.useState(false);

  const handleSyncOrder = useCallback(async () => {
    setOrderLoading(true);

    try {
      const db = await getDBConnection();
      const allCustomer = await getAllCustomers(db);

      console.log('All Customer sendding...', allCustomer);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Muvaffaqiyatli',
          text2: 'Buyurtmalar muvaffaqiyatli sinxronlandi',
        });
        setOrderLoading(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to initialize database', err);
    }
  }, []);

  return (
    <SpeedDial
      isOpen={open}
      icon={<Icon name={'repeat'} size={20} color={'#ffffff'} />}
      openIcon={{name: 'close', color: '#fff'}}
      onOpen={() => setOpen(!open)}
      onClose={() =>
        (!customerLoading || !productLoading || !orderLoading) && setOpen(!open)
      }
      loading={customerLoading || productLoading || orderLoading}>
      <SyncBtnCustomer
        loading={customerLoading}
        setLoading={setCustomerLoading}
      />
      <SyncBtnProduct loading={productLoading} setLoading={setProductLoading} />
      
      <SpeedDial.Action
        icon={<Icon name={'download'} size={20} color={'#ffffff'} />}
        title="Buyurtmalar"
        onPress={handleSyncOrder}
        loading={orderLoading}
      />
    </SpeedDial>
    // <Pressable onPress={() => {}} style={styles.addBtnContainer}>
    //   <Icon name={'repeat'} size={20} color={'#ffffff'} />
    // </Pressable>
  );
};

export default React.memo(SyncBtn);
