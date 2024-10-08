import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import OrderDraftProductCard, {
  OrderDraftProductCardProps,
} from './OrderDraftProductCard';

interface OrderDraftProductCardListProps {
  list: OrderDraftProductCardProps[];
}

const OrderDraftProductCardList = ({list}: OrderDraftProductCardListProps) => {
  // Render function for each item
  const renderItem = useCallback(
    ({item}: {item: OrderDraftProductCardProps}) => (
      <OrderDraftProductCard {...item} />
    ),
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

export default React.memo(OrderDraftProductCardList);

