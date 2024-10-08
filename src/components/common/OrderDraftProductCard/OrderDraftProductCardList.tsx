import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import OrderDraftProductCard, {
  IOrderDraftProductCard,
} from './OrderDraftProductCard';

interface OrderDraftProductCardListProps {
  list: IOrderDraftProductCard[];
  orderDraftId: string;
  deleteBtn?: boolean;
}

const OrderDraftProductCardList = ({
  list,
  orderDraftId,
  deleteBtn,
}: OrderDraftProductCardListProps) => {
  // Render function for each item
  const renderItem = useCallback(
    ({item}: {item: IOrderDraftProductCard}) => (
      <OrderDraftProductCard
        {...item}
        orderDraftId={orderDraftId}
        deleteBtn={deleteBtn}
      />
    ),
    [deleteBtn, orderDraftId],
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      keyboardDismissMode="on-drag"
    />
  );
};

export default React.memo(OrderDraftProductCardList);
