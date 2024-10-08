import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import OrderDraftProductCard, {
  IOrderDraftProductCard,
} from './OrderDraftProductCard';

interface OrderDraftProductCardListProps {
  list: IOrderDraftProductCard[];
  orderDraftId: string;
}

const OrderDraftProductCardList = ({
  list,
  orderDraftId,
}: OrderDraftProductCardListProps) => {
  // Render function for each item
  const renderItem = useCallback(
    ({item}: {item: IOrderDraftProductCard}) => (
      <OrderDraftProductCard {...item} orderDraftId={orderDraftId} />
    ),
    [orderDraftId],
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
