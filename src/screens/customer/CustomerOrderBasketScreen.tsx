import React from 'react';
import {StyleSheet} from 'react-native';
import {selectedOrderProducts} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';

const CustomerOrderBasketScreen = () => {
  // Store
  const selectedProduct = useTypesSelector(selectedOrderProducts);

  return (
    <Container>
      <CustomerHeaderOperation title="Mening savatim" showSearch />
      <BasketProductCardList list={selectedProduct} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderBasketScreen);
