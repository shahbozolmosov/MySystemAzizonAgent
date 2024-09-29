import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {useGetProductOrderAllQuery} from '../../app/services/order/order';
import Container from '../../components/common/Container/Container';
import {OrderCardProps} from '../../components/common/OrderCard/OrderCard';
import OrderCardList from '../../components/common/OrderCard/OrderCardList';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';
import {handleApiResponse} from '../../utils/handleApiResponse';

type CustomerOrderCanceledScreenProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Canceled'
>;

const CustomerOrderCanceledScreen = ({
  route,
}: CustomerOrderCanceledScreenProps) => {
  // Route
  const {customerId} = route.params;

  const orderRes = useGetProductOrderAllQuery({
    customerId,
    status: 'bekor_qilingan',
  });

  const data = useMemo<OrderCardProps[]>(() => {
    return handleApiResponse(orderRes);
  }, [orderRes]);

  return (
    <Container>
      <OrderCardList list={data} />
    </Container>
  );
};

export default React.memo(CustomerOrderCanceledScreen);
