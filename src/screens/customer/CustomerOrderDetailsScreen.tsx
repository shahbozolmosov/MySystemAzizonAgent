import {Text} from 'react-native';
import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack.tsx';
import {useGetProductByIdQuery} from '../../app/services/order/order.ts';
import Container from '../../components/common/Container/Container.tsx';
import OrderCard, {
  IOrderCard,
} from '../../components/common/OrderCard/OrderCard.tsx';
import {handleApiResponseObj} from '../../utils/handleApiResponseObj.ts';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation.tsx';

type CustomerOrderDetailsScreen = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderDetails'
>;

const CustomerOrderDetailsScreen = ({
  navigation,
  route,
}: CustomerOrderDetailsScreen) => {
  // Route
  const {customerId, orderId} = route.params;

  // API
  const orderRes = useGetProductByIdQuery(orderId);

  // Order data
  const data = useMemo<IOrderCard | null>(() => {
    return handleApiResponseObj<IOrderCard>(orderRes);
  }, [orderRes]);

  return !data ? (
    <Container>
      <Text>404 | Not found</Text>
    </Container>
  ) : (
    <Container>
      <CustomerHeaderOperation title={`#${data.id}`} />

      <OrderCard {...data} />
      <Text>
        CustomerOrderDetailsScreen, {customerId} - {orderId}
      </Text>
    </Container>
  );
};

export default React.memo(CustomerOrderDetailsScreen);
