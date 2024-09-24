import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import CustomerHeader from '../../components/common/CustomerHeader/CustomerHeader';
import {RootStackParamList} from '../../routes/RootNavigator';

type CustomerHomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerStack'
>;

const CustomerHomeScreen = ({}) => {
  const route = useRoute<CustomerHomeScreenRouteProp>();

  return (
    <Container>
      <CustomerHeader />

      {/* <Button title={'Toggle drawer'} onPress={toggleDrawer} /> */}
      <Text>CustomerHome {JSON.stringify(route.params)}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHomeScreen);
