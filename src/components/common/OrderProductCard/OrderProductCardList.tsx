import React from 'react';
import {StyleSheet, View} from 'react-native';
import OrderProductCard from './OrderProductCard';

const OrderProductCardList = () => {
  return (
    <View style={styles.container}>
      <OrderProductCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(OrderProductCardList);
