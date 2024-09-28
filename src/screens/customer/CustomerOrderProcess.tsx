import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {useGetProductOrderAllQuery} from '../../app/services/order/order';
import Container from '../../components/common/Container/Container';
import OrderCard, {
  OrderCardProps,
} from '../../components/common/OrderCard/OrderCard';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';
import {handleApiResponse} from '../../utils/handleApiResponse';
import OrderCardList from '../../components/common/OrderCard/OrderCardList';

type CustomerOrderProcessProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Process'
>;

const CustomerOrderProcess = ({
  navigation,
  route,
}: CustomerOrderProcessProps) => {
  const orderRes = useGetProductOrderAllQuery();

  const data = useMemo<OrderCardProps[]>(() => {
    return handleApiResponse(orderRes);
  }, [orderRes]);

  console.log(JSON.stringify(data, null, 2));

  return (
    <Container>
      <OrderCardList list={data} />
    </Container>
  );
};

export default React.memo(CustomerOrderProcess);
