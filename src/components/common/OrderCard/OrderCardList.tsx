import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import OrderCard, {OrderCardProps} from './OrderCard';

type OrderCardList = {
  list: OrderCardProps[];
};

const OrderCardList = ({list}: OrderCardList) => {
  const renderItem = useCallback(({item}: {item: OrderCardProps}) => {
    return <OrderCard {...item} />;
  }, []);

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default React.memo(OrderCardList);
