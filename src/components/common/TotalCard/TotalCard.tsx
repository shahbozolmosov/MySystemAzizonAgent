import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type TotalCardProps = {
  amount: number;
  massa: number;
  price: number;
  discount: number;
  payment: number;
};

const TotalCard = ({
  amount,
  massa,
  price,
  discount,
  payment,
}: TotalCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.label}>Jami soni</Text>
          <Text style={styles.value}>
            {amount.toLocaleString()}&nbsp;
            <Text style={styles.valuePrefix}>ta</Text>
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Jami massa</Text>
          <Text style={styles.value}>
            {massa.toLocaleString()}&nbsp;
            <Text style={styles.valuePrefix}>kg</Text>
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Summa</Text>
          <Text style={styles.value}>{price.toLocaleString()}&nbsp;</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Chegirma</Text>
          <Text style={styles.value}>{discount.toLocaleString()}&nbsp;</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>To'lov</Text>
          <Text style={styles.valueLg}>{payment.toLocaleString()}&nbsp;</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 14,
    borderRadius: 10,
    elevation: 40,
    shadowColor: 'rgba(153, 161, 169, 1)',
    shadowOffset: {
      width: 400,
      height: 100,
    },
    shadowRadius: 10,
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 40,
  },
  list: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#808080',
  },
  value: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
  valueLg: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    fontSize: 18,
    color: '#242424',
  },
  valuePrefix: {
    fontFamily: 'Roboto-Light',
    fontWeight: '300',
    fontSize: 14,
    color: '#242424',
  },
});

export default React.memo(TotalCard);
