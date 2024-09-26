import React, {useCallback, useMemo} from 'react';
import {ScrollView} from 'react-native';
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
import {handleApiResponse} from '../../utils/handleApiResponse';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';

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

  return (
    <Container paddingHorizontal={0}>
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
