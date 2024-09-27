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
import {ScrollView} from 'react-native-gesture-handler';
import CustomerOrderCard from '../../components/common/CustomerOrderCard/CustomerOrderCard';

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
          <ScrollView style={styles.body}>
            <CustomerOrderCard />
            <TotalCard
              amount={40}
              massa={503}
              price={2300000}
              discount={-3042}
              payment={2000000}
            />
            <BasketProductCardList list={selectedProducts} />
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              color={'error'}
              title={'Qoralamaga saqlash'}
              type="outline"
            />
            <Button color={'secondary'} title={'Buyurtmani yuborish'} />
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
