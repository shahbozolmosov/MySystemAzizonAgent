import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {CustomerTabStackParamList} from '../../../routes/customer/CustomerStack.tsx';
import OrderCard, {IOrderCard} from './OrderCard';

type OrderCardList = {
  list: IOrderCard[];
  customerId: string;
};

type CustomerCardListNavigationProp =
  NativeStackNavigationProp<CustomerTabStackParamList>;

const OrderCardList = ({list, customerId}: OrderCardList) => {
  const navigation = useNavigation<CustomerCardListNavigationProp>();

  const handleNavigate = useCallback(
    (orderId: string) => {
      navigation.push('CustomerOrderDetails', {customerId, orderId});
    },
    [customerId, navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: IOrderCard}) => {
      return <OrderCard {...item} onNavigate={handleNavigate} />;
    },
    [handleNavigate],
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default React.memo(OrderCardList);
