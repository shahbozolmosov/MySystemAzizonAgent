import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  clearOrderProduct,
  selectedOrderProductsAmount,
} from '../../app/services/order/orderSlice';
import {Product} from '../../app/services/product/product';
import {useTypesSelector} from '../../app/store';
import Container from '../../components/common/Container/Container';
import OrderProductCardList from '../../components/common/OrderProductCard/OrderProductCardList';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import NoResult from '../../components/errors/NoResult/NoResult';
import IconButton from '../../components/ui/IconButton/IconButton';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack';
import {getDBConnection} from '../../database/sqlite.ts';
import {getAllProducts} from '../../database/products.ts';

type CustomerOrderAddScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderAdd'
>;

const CustomerOrderAddScreen = ({
  navigation,
  route,
}: CustomerOrderAddScreenProps) => {
  // Route
  const {customerId} = route.params;

  // State
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Store
  const selectedProductsAmount = useTypesSelector(selectedOrderProductsAmount);

  // Dispatch
  const dispatch = useDispatch();

  // State
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        const allProducts = await getAllProducts(db);

        if (allProducts) {
          setProductData(allProducts);
        }
      } catch (err) {
        console.error('Failed to initialize database', err);
      }finally {
        setIsLoading(false);
      }
    };

    initDB();
  }, []);

  const handleNavigateBasket = useCallback(() => {
    navigation.push('CustomerOrderBasket', {customerId});
  }, [customerId, navigation]);

  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert(
        'Diqqat!',
        "Agar orqaga qaytadigan bo'lsangiz ma'lumotlar saqlanmaydi?",
        [
          {
            text: 'Bekor qilish',
            style: 'cancel',
            onPress: () => {},
          },
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
      {isLoading ? (
        <Text>Loading...</Text>
      ) : !filteredProducts.length ? (
        <NoResult
          title="Mahlumotlar topilmadi"
          desc="Hozircha sizda buyurtmalar mavjud emas!"
        />
      ) : (
        <OrderProductCardList list={filteredProducts} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderAddScreen);
