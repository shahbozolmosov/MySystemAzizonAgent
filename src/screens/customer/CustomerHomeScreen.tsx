import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  ICustomer,
  useGetCustomerByIdQuery,
} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import CustomerHeader from '../../components/common/CustomerHeader/CustomerHeader';
import {RootStackParamList} from '../../routes/RootNavigator';
import {handleApiResponseObj} from '../../utils/handleApiResponseObj';

type CustomerHomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerStack'
>;

const CustomerHomeScreen = ({}) => {
  // Route
  const route = useRoute<CustomerHomeScreenRouteProp>();
  const {customerId} = route.params;

  // API
  const customerRes = useGetCustomerByIdQuery(customerId);

  const customerData = useMemo(() => {
    return handleApiResponseObj<ICustomer>(customerRes);
  }, [customerRes]);

  return (
    <Container>
      <CustomerHeader
        customer={customerData}
        isLoading={customerRes.isLoading || customerRes.isFetching}
      />

      {/* <Button title={'Toggle drawer'} onPress={toggleDrawer} /> */}
      <Text>CustomerHome {customerId}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHomeScreen);
