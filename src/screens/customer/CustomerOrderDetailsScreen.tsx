import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import PaymentDetailsCard, {
  PaymentDetailsCardProps,
} from '../../components/common/PaymentDetailsCard/PaymentDetailsCard.tsx';

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

  const paymentData = useMemo<PaymentDetailsCardProps>(() => {
    if (data) {
      return {
        productCount: data.mahsulot_soni,
        productAmount: data.buyurtma_massa,
        productTotalPrice: data.tasdiqlangan_summa,
        tasdiqlangan_chegirma: data.tasdiqlangan_chegirma,
        tolov_summa: data.tolov_summa,
      };
    }

    return {
      productCount: 0,
      productAmount: 0,
      productTotalPrice: 0,
      tasdiqlangan_chegirma: 0,
      tolov_summa: 0,
    };
  }, [data]);
  console.log('paymentData-0000000000', paymentData);

  return !data ? (
    <Container>
      <Text>404 | Not found</Text>
    </Container>
  ) : (
    <Container>
      <CustomerHeaderOperation title={`#${data.id}`} />

      <ScrollView>
        <View style={styles.container}>
          <SectionTitle title={'Mahsulotlar'} />
          <ProductCardOfDetailsList list={data.product_list} />
          <SectionTitle title={"To'lov"} />
          <PaymentDetailsCard {...paymentData} />
        </View>
      </ScrollView>
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
