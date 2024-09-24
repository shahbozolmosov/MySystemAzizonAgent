import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import CustomerOrderHeader from '../../components/customer/CustomerOrderHeader/CustomerOrderHeader';

const CustomerOrderScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <CustomerOrderHeader search={search} setSearch={setSearch} />
      <Text>CustomerOrderScreen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderScreen);
