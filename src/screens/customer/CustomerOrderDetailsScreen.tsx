import {StyleSheet, Text, View} from 'react-native';
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
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.tsx';
import ProductCardOfDetails from '../../components/common/ProductCardOfDetails/ProductCardOfDetails.tsx';
import ProductCardOfDetailsList from '../../components/common/ProductCardOfDetails/ProductCardOfDetailsList.tsx';

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

      <View style={styles.container}>
        <SectionTitle title={'Mahsulotlar'} />
        <ProductCardOfDetailsList list={data.product_list} />
        <SectionTitle title={'Yetkazib berish'} />
        <SectionTitle title={"To'lov"} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
});

export default React.memo(CustomerOrderDetailsScreen);
