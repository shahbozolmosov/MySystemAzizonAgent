import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import OrderProductCard, {OrderProductCardProps} from './OrderProductCard';

interface OrderProductCardListProps {
  list: OrderProductCardProps[];
}

const OrderProductCardList = ({list}: OrderProductCardListProps) => {
  // Render function for each item
  const renderItem = useCallback(
    ({item}: {item: OrderProductCardProps}) => <OrderProductCard {...item} />,
    [],
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default React.memo(OrderProductCardList);
