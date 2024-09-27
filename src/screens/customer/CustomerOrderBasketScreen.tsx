import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {selectedOrderProducts} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import EmptyBasket from '../../components/errors/EmptyBasket/EmptyBasket';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';

type CustomerOrderBasketScreenProps =
  NativeStackScreenProps<CustomerTabStackParamList>;

const CustomerOrderBasketScreen = ({
  navigation,
}: CustomerOrderBasketScreenProps) => {
  // Store
  const selectedProduct = useTypesSelector(selectedOrderProducts);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <CustomerHeaderOperation title="Mening savatim" showSearch />

      {!selectedProduct.length ? (
        <EmptyBasket onGoBack={handleBack} />
      ) : (
        <ScrollView>
          <BasketProductCardList list={selectedProduct} />
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerOrderBasketScreen);
