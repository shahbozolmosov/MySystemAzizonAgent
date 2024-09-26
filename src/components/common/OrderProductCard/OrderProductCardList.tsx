import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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

export default React.memo(OrderProductCardList);
