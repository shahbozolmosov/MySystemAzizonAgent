import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  OrderProduct,
  selectedOrderProducts,
} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import EmptyBasket from '../../components/errors/EmptyBasket/EmptyBasket';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';
import IconButton from '../../components/ui/IconButton/IconButton';
import TotalCard, {
  TotalCardProps,
} from '../../components/common/TotalCard/TotalCard';
import {Button} from '@rneui/themed';
import {ScrollView} from 'react-native-gesture-handler';
import CustomerOrderCard from '../../components/common/CustomerOrderCard/CustomerOrderCard';
import {
  ICustomer,
  useGetCustomerByIdQuery,
} from '../../app/services/customer/customer';
import {handleApiResponseObj} from '../../utils/handleApiResponseObj';

type CustomerOrderBasketScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderBasketScreen'
>;

const CustomerOrderBasketScreen = ({
  navigation,
  route,
}: CustomerOrderBasketScreenProps) => {
  // Route
  const {customerId} = route.params;

  // Store
  const selectedProducts = useTypesSelector(selectedOrderProducts);

  // API
  const customerRes = useGetCustomerByIdQuery(customerId);

  // Customer
  const customerData = useMemo<ICustomer | null>(() => {
    return handleApiResponseObj<ICustomer>(customerRes);
  }, [customerRes]);

  // Total data
  const totalData = useMemo<TotalCardProps>(() => {
    const massa = selectedProducts.reduce((a, b) => {
      if (b.inputAmount) {
        return a + b.inputAmount;
      }
      return a;
    }, 0);

    const price = selectedProducts.reduce((a, b) => {
      if (b.inputAmount) {
        return a + b.inputAmount * b.price;
      }
      return a;
    }, 0);

    return {
      amount: selectedOrderProducts.length,
      massa,
      price,
      discount: 0,
      payment: price,
    };
  }, [selectedProducts]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle submit
  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <CustomerHeaderOperation
        title="Mening savatim"
        showSearch
        customElements={
          <IconButton
            icon="shopping-bag"
            badgeShown={true}
            badgeAmount={selectedProducts.length}
          />
        }
      />

      {!selectedProducts.length ? (
        <EmptyBasket onGoBack={handleBack} />
      ) : (
        <>
          <ScrollView style={styles.body}>
            {customerData && <CustomerOrderCard {...customerData} />}

            <TotalCard {...totalData} />
            <BasketProductCardList list={selectedProducts} />
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              color={'error'}
              title={'Qoralamaga saqlash'}
              type="outline"
            />
            <Button
              color={'secondary'}
              title={`Buyurtmani yuborish (${selectedOrderProducts.length})`}
            />
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btnWrapper: {
    gap: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#F4F4F4',
    backgroundColor: '#ffffff',
  },
});

export default React.memo(CustomerOrderBasketScreen);
