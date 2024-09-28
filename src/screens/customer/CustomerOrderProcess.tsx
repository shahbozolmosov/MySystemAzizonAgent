import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';
import {useGetProductOrderAllQuery} from '../../app/services/order/order';
import {handleApiResponse} from '../../utils/handleApiResponse';
import OrderCard from '../../components/common/OrderCard/OrderCard';

type CustomerOrderProcessProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Process'
>;

const CustomerOrderProcess = ({
  navigation,
  route,
}: CustomerOrderProcessProps) => {
  const orderRes = useGetProductOrderAllQuery();

  const data = useMemo(() => {
    return handleApiResponse(orderRes);
  }, [orderRes]);

  console.log(JSON.stringify(data, null, 2))
  
  return (
    <Container>
      <OrderCard />
    </Container>
  );
};

export default React.memo(CustomerOrderProcess);
