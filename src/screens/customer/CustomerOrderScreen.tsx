import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import CustomerOrderHeader from '../../components/customer/CustomerOrderHeader/CustomerOrderHeader';

const CustomerOrderScreen = () => {
  return (
    <Container>
      <CustomerOrderHeader />
      <Text>CustomerOrderScreen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderScreen);
