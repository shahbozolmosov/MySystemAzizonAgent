import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {selectedOrderProducts} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import EmptyBasket from '../../components/errors/EmptyBasket/EmptyBasket';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';
import IconButton from '../../components/ui/IconButton/IconButton';
import TotalCard from '../../components/common/TotalCard/TotalCard';
import {Button} from '@rneui/themed';

type CustomerOrderBasketScreenProps =
  NativeStackScreenProps<CustomerTabStackParamList>;

const CustomerOrderBasketScreen = ({
  navigation,
}: CustomerOrderBasketScreenProps) => {
  // Store
  const selectedProducts = useTypesSelector(selectedOrderProducts);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
          <TotalCard
            amount={40}
            massa={503}
            price={2300000}
            discount={-3042}
            payment={2000000}
          />
          <BasketProductCardList list={selectedProducts} />
          <View style={styles.btnWrapper}>
            <Button color={'error'} title={'Buyurtmani yuborish'} />
            <Button color={'secondary'} title={'Qoralamaga saqlash'} />
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
  },
});

export default React.memo(CustomerOrderBasketScreen);
