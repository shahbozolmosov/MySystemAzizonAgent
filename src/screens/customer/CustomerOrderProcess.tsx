import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';

type CustomerOrderProcessProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Process'
>;

const CustomerOrderProcess = ({
  navigation,
  route,
}: CustomerOrderProcessProps) => {
  return (
    <Container>
      <Text>CustomerOrderHistoryProcess</Text>
    </Container>
  );
};

export default React.memo(CustomerOrderProcess);
