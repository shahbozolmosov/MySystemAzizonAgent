import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Alert, ScrollView} from 'react-native';
import {selectedOrderProductsAmount} from '../../app/services/order/orderSlice';
import {
  Product,
  useGetProductAllQuery,
} from '../../app/services/product/product';
import {useTypesSelector} from '../../app/store';
import Container from '../../components/common/Container/Container';
import OrderProductCardList from '../../components/common/OrderProductCard/OrderProductCardList';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../components/ui/IconButton/IconButton';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';
import {handleApiResponse} from '../../utils/handleApiResponse';

type CustomerOrderAddScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderAddScreen'
>;

const CustomerOrderAddScreen = ({
  navigation,
  route,
}: CustomerOrderAddScreenProps) => {
  // Route
  const {customerId} = route.params;

  // Store
  const selectedProductsAmount = useTypesSelector(selectedOrderProductsAmount);

  // API
  const productRes = useGetProductAllQuery();

  const productData = useMemo<Product[]>(() => {
    return handleApiResponse(productRes);
  }, [productRes]);

  const handleNavigateBasket = useCallback(() => {
    navigation.push('CustomerOrderBasketScreen', {customerId});
  }, [customerId, navigation]);

  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert(
        'Diqqat!',
        "Agar orqaga qaytadigan bo'lsangiz ma'lumotlar saqlanmaydi?",
        [
          {text: 'Bekor qilish', style: 'cancel', onPress: () => {}},
          {
            text: 'Ha',
            style: 'destructive',

            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
        {cancelable: true},
      );
    });

    return () =>
      navigation.removeListener('beforeRemove', beforeRemoveListener);
  }, [navigation]);

  return (
    <Container>
      <CustomerHeaderOperation
        title="Umumiy"
        showSearch
        customElements={
          <>
            <IconButton icon="filter" />
            <IconButton
              icon="shopping-bag"
              badgeShown={true}
              badgeAmount={selectedProductsAmount}
              onPress={handleNavigateBasket}
            />
          </>
        }
      />
      <ScrollView>
        <OrderProductCardList list={productData} />
      </ScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderAddScreen);
