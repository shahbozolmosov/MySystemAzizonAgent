import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {
  ICustomer,
  useGetCustomerByIdQuery,
} from '../../app/services/customer/customer';
import {
  OrderAdd,
  useAddProductOrderMutation,
} from '../../app/services/order/order';
import {selectedOrderProducts} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerOrderCard from '../../components/common/CustomerOrderCard/CustomerOrderCard';
import TotalCard, {
  TotalCardProps,
} from '../../components/common/TotalCard/TotalCard';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import EmptyBasket from '../../components/errors/EmptyBasket/EmptyBasket';
import IconButton from '../../components/ui/IconButton/IconButton';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';
import {handleError} from '../../utils/errorHandler';
import {getLocation} from '../../utils/getLocation';
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

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Store
  const selectedProducts = useTypesSelector(selectedOrderProducts);

  // API
  const customerRes = useGetCustomerByIdQuery(customerId);
  const [addData] = useAddProductOrderMutation();

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
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    const location = await getLocation();
    if (!location) {
      Toast.show({
        type: 'info',
        text1: 'Buyurtma bajarilmadi',
        text2: 'Buyurtma bajarilishi uchun sizning manzilingiz olinishi kerak.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const data: OrderAdd = {
        client_id: customerId,
        product_list: [],
        izoh: '',
        izoh_dostavka: '',
        alohida: false,
        lat: location.latitude,
        lon: location.longitude,
      };
      console.log('🚀 ~ handleSubmit ~ data:', data);
      return;
      const res = await addData(data).unwrap();

      if (res.success) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.message,
        });
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [addData, customerId]);

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
              onPress={handleSubmit}
              loading={isLoading}
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
