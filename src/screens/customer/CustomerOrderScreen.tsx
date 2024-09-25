import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import {RootStackParamList} from '../../routes/RootNavigator';

type CustomerOrderScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerStack'
>;

const CustomerOrderScreen = () => {
  // Route
  const route = useRoute<CustomerOrderScreenRouteProp>();
  const {customerId} = route.params;

  return (
    <Container>
      <CustomerHeaderOperation />
      <MainScrollView>
        <Text>Lorem</Text>
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderScreen);
