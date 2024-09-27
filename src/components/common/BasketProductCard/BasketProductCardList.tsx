import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
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
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
});

export default React.memo(BasketProductCardList);
