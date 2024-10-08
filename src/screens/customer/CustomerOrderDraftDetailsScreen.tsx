import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  selectedOrderDraftProducts,
  setOrderDraftProductMultiple,
} from '../../app/services/order/orderSlice.ts';
import {useTypesSelector} from '../../app/store.ts';
import Container from '../../components/common/Container/Container.tsx';
import OrderDraftProductCardList from '../../components/common/OrderDraftProductCard/OrderDraftProductCardList.tsx';
import PaymentDetailsCard, {
  PaymentDetailsCardProps,
} from '../../components/common/PaymentDetailsCard/PaymentDetailsCard.tsx';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation.tsx';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.tsx';
import {getOrderDraftById} from '../../database/orderDraft.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {OrderDraft} from '../../database/tables/orderDraft.table.ts';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack.tsx';
import OrderDraftProductAddCard from '../../components/common/OrderDraftProductCard/OrderDraftProductAddCard.tsx';

type CustomerOrderDraftDetailsScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderDraftDetails'
>;

const CustomerOrderDraftDetailsScreen = ({
  route,
}: CustomerOrderDraftDetailsScreenProps) => {
  // Route
  const {orderId} = route.params;

  // State
  const [data, setData] = useState<OrderDraft | null>(null);
  console.log('🚀 ~ data:', data);

  // Dispatch
  const dispatch = useDispatch();

  const selectedProducts = useTypesSelector(selectedOrderDraftProducts);

  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();

      const order = await getOrderDraftById(db, orderId);

      if (order) {
        dispatch(setOrderDraftProductMultiple(order.products_list));
        setData(order);
      }
    };

    initDB();
  }, [dispatch, orderId]);

  const getNumber = useCallback((value: string) => {
    if (value) {
      return parseFloat(value);
    }
    return 0;
  }, []);

  const paymentData = useMemo<PaymentDetailsCardProps>(() => {
    if (data) {
      const productTotalPrice = data.product_list.reduce(
        (a, b) => a + getNumber(b.inputAmount) * b.price,
        0,
      );

      return {
        productCount: data.product_list.length,
        productAmount: data.product_list.reduce(
          (a, b) => a + getNumber(b.inputAmount),
          0,
        ),
        productTotalPrice,
        tasdiqlangan_chegirma: 0,
        tolov_summa: 0,
      };
    }

    return {
      productCount: 0,
      productAmount: 0,
      productTotalPrice: 0,
      tasdiqlangan_chegirma: 0,
      tolov_summa: 0,
    };
  }, [data, getNumber]);

  return !data ? (
    <Container>
      <Text>404 | Not found</Text>
    </Container>
  ) : (
    <Container>
      <CustomerHeaderOperation title={`#${data.uid} - qoralama`} />

      <ScrollView>
        <View style={styles.container}>
          {/* Products */}
          <SectionTitle title={'Mahsulotlar'} />
          <OrderDraftProductCardList
            list={selectedProducts}
            orderDraftId={orderId}
          />

          {/* Add product btn */}
          <OrderDraftProductAddCard onPress={() => {}} />

          {/* Payment */}
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

export default React.memo(CustomerOrderDraftDetailsScreen);
