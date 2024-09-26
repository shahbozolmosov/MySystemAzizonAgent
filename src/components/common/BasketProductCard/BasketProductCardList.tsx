import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(BasketProductCardList);
