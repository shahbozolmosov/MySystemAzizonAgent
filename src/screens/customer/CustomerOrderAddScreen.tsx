import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  clearOrderProduct,
  selectedOrderProductsAmount,
} from '../../app/services/order/orderSlice';
import {
  Product,
  useGetProductAllQuery,
} from '../../app/services/product/product';
import {useTypesSelector} from '../../app/store';
import Container from '../../components/common/Container/Container';
import OrderProductCardList from '../../components/common/OrderProductCard/OrderProductCardList';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import NoResult from '../../components/errors/NoResult/NoResult';
import IconButton from '../../components/ui/IconButton/IconButton';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack';
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

  // State
  const [searchValue, setSearchValue] = useState('');

  // Store
  const selectedProductsAmount = useTypesSelector(selectedOrderProductsAmount);

  // Dispatch
  const dispatch = useDispatch();

  // API
  const productRes = useGetProductAllQuery({customerId});

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

            onPress: () => {
              dispatch(clearOrderProduct());
              navigation.dispatch(e.data.action);
            },
          },
        ],
        {cancelable: true},
      );
    });

    return () =>
      navigation.removeListener('beforeRemove', beforeRemoveListener);
  }, [dispatch, navigation]);

  const filteredProducts = useMemo(() => {
    return productData.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [productData, searchValue]);

  const handleChangeSearch = useCallback((text: string) => {
    setSearchValue(text);
  }, []);

  return (
    <Container>
      <CustomerHeaderOperation
        title="Umumiy"
        showSearch
        setSearchVal={handleChangeSearch}
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
      {productRes.isLoading || productRes.isFetching ? (
        <Text>Loading...</Text>
      ) : !filteredProducts.length ? (
        <NoResult
          title="Mahlumotlar topilmadi"
          desc="Hozircha sizda mahsulotlar mavjud emas!"
        />
      ) : (
        <OrderProductCardList list={filteredProducts} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderAddScreen);
