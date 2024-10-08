import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Product} from '../../app/services/product/product.ts';
import Container from '../../components/common/Container/Container.tsx';
import OrderDraftProductCardList from '../../components/common/OrderDraftProductCard/OrderDraftProductCardList.tsx';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation.tsx';
import NoResult from '../../components/errors/NoResult/NoResult.tsx';
import IconButton from '../../components/ui/IconButton/IconButton.tsx';
import {getAllProducts} from '../../database/products.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack.tsx';

type CustomerOrderDraftAddProductScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderDraftAddProduct'
>;

const CustomerOrderDraftAddProductScreen = ({
  route,
}: CustomerOrderDraftAddProductScreenProps) => {
  // Route
  const {orderId} = route.params;

  // State
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    initDB();
  }, []);

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
      <Container>
        <CustomerHeaderOperation
          title="Umumiy"
          showSearch
          setSearchVal={handleChangeSearch}
          customElements={
            <>
              <IconButton icon="filter" />
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
          <OrderDraftProductCardList
            orderDraftId={orderId}
            list={filteredProducts}
            deleteBtn={false}
          />
        )}
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderDraftAddProductScreen);
