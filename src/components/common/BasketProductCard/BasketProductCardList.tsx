import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import BasketProductCard, {BasketProductCardProps} from './BasketProductCard';

interface BasketProductCardListProps {
  list: BasketProductCardProps[];
}

const BasketProductCardList = ({list}: BasketProductCardListProps) => {
  // Render function for each item
  const renderItem = useCallback(
    ({item}: {item: BasketProductCardProps}) => <BasketProductCard {...item} />,
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

export default React.memo(BasketProductCardList);
