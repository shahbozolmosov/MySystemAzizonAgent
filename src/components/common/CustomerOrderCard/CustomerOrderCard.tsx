import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PhoneBtn from '../../ui/PhoneBtn/PhoneBtn';

type TotalCardProps = {};

const data = {
  balans: 0,
  payment: 0,
};

const CustomerOrderCard = ({}: TotalCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olmosov Shahboz</Text>
        <PhoneBtn phoneNumber="+998(99)-747-04-73" />
      </View>
      <View style={styles.divider} />
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.label}>Balans</Text>
          <Text style={styles.value}>{data.balans.toLocaleString()}&nbsp;</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Telefon</Text>
          <Text style={styles.value}>+998(99)-747-04-73</Text>
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
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#1e232c',
  },
  divider: {
    height: 1,
    backgroundColor: '#F4F4F4',
    marginVertical: 14,
  },
  list: {
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 18,
    color: '#808080',
  },
  value: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 18,
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

export default React.memo(CustomerOrderCard);
