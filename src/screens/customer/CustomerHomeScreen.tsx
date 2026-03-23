import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import CustomerHeader from '../../components/customer/CustomerHeader/CustomerHeader';
import {RootStackParamList} from '../../routes/RootNavigator';

type CustomerHomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerStack'
>;

const CustomerHomeScreen = ({}) => {
  // Route
  const route = useRoute<CustomerHomeScreenRouteProp>();
  const {customerId} = route.params;

  return (
    <Container>
      <CustomerHeader customerId={customerId} />

      {/* <Button title={'Toggle drawer'} onPress={toggleDrawer} /> */}
      <Text>CustomerHome {customerId}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHomeScreen);
