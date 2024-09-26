import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import {useTypesSelector} from '../../app/store';
import {selectedOrderProducts} from '../../app/services/order/orderSlice';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';

const CustomerOrderBasketScreen = () => {
  // Store
  const selectedProduct = useTypesSelector(selectedOrderProducts);

  return (
    <Container paddingHorizontal={0}>
      <CustomerHeaderOperation title="Mening savatim" showSearch />
      <Text>CustomerOrderBasketScreen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderBasketScreen);
