import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomerCard, {CustomerCardProps} from './CustomerCard';

type CustomerCardListProps = {
  list: CustomerCardProps[];
};

const CustomerCardList = ({list}: CustomerCardListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mijozlar</Text>
      <View style={styles.list}>
        {list.map(customer => (
          <CustomerCard {...customer} key={customer.id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
  },
  list: {},
});

export default CustomerCardList;
