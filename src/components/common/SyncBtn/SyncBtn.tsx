import {SpeedDial} from '@rneui/themed';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import SyncBtnCustomer from './SyncBtnCustomer.tsx';
import SyncBtnOrderGet from './SyncBtnOrderGet.tsx';
import SyncBtnOrderUpload from './SyncBtnOrderUpload.tsx';
import SyncBtnProduct from './SyncBtnProduct.tsx';

const SyncBtn = () => {
  const [open, setOpen] = React.useState(false);

  const [customerLoading, setCustomerLoading] = React.useState(false);
  const [productLoading, setProductLoading] = React.useState(false);
  const [orderUploading, setOrderUploading] = React.useState(false);
  const [orderGetting, setOrderGetting] = React.useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (
      !customerLoading ||
      !productLoading ||
      !orderUploading ||
      !orderGetting
    ) {
      setOpen(!open);
    }
  }, [customerLoading, open, orderGetting, orderUploading, productLoading]);

  return (
    <SpeedDial
      isOpen={open}
      icon={<Icon name={'repeat'} size={20} color={'#ffffff'} />}
      openIcon={{name: 'close', color: '#fff'}}
      onOpen={handleOpen}
      onClose={handleClose}
      loading={customerLoading || productLoading || orderUploading}>
      {/* Customer */}
      <SyncBtnCustomer
        loading={customerLoading}
        setLoading={setCustomerLoading}
      />
      {/* Product */}
      <SyncBtnProduct loading={productLoading} setLoading={setProductLoading} />

      {/* Order Getting */}
      <SyncBtnOrderGet loading={orderGetting} setLoading={setOrderGetting} />

      {/* Order Uploading */}
      <SyncBtnOrderUpload
        loading={orderUploading}
        setLoading={setOrderUploading}
      />
    </SpeedDial>
  );
};

export default React.memo(SyncBtn);
