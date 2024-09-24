import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICustomer} from '../../../app/services/customer/customer';

export interface CustomerCardProps extends ICustomer {}

const CustomerCard = ({fio, korxona}: CustomerCardProps) => {
  const arrFio = fio?.split(' ');
  let firstName = '';
  let lastName = '';

  if (fio) {
    firstName = arrFio[0];
    lastName = arrFio[1];
  }
  
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => Alert.alert('render')}>
        <View style={styles.touchable}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{fio}</Text>
            <Text style={styles.caption}>{korxona}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  touchable: {
    flexDirection: 'row',
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: '#00aa55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
  avatarText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffffff',
  },
  body: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#000000',
    marginBottom: 4,
  },
  caption: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#000000',
  },
});

export default CustomerCard;
