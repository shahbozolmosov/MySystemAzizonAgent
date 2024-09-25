import React from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../components/ui/IconButton/IconButton';
import OrderProductCardList from '../../components/common/OrderProductCard/OrderProductCardList';

const CustomerOrderAddScreen = () => {
  return (
    <Container paddingHorizontal={0}>
      <CustomerHeaderOperation
        title="Umumiy"
        showSearch
        customElements={
          <>
            <IconButton icon="filter" />
          </>
        }
      />
      <MainScrollView>
        <OrderProductCardList />
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderAddScreen);
