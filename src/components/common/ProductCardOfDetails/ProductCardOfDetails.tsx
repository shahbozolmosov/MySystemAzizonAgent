import {OrderProduct} from '../../../app/services/order/order.ts';
import ProductImage from '../../../../assets/product.jpg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from '@rneui/themed';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export interface ProductCardOfDetailsProps extends OrderProduct {}

const ProductCardOfDetails = (props: ProductCardOfDetailsProps) => {
  const {name, article, real_price, summa, massa} = props;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={ProductImage} />
      <TouchableOpacity style={styles.removeBtn} onPress={() => {}}>
        <Icon name="trash" size={16} color={'#1e232c'} />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Text style={styles.title} selectable={true}>
            {name}[{article}]
          </Text>
          <Text style={styles.price}>{massa.toLocaleString()} kg</Text>
          <Text style={styles.price}>{real_price.toLocaleString()} so'm</Text>
        </View>
        <View style={styles.bodyFooter}>
          <Text style={styles.totalPrice}>{summa.toLocaleString()} so'm</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBF0FF',
    marginBottom: 8,
    borderRadius: 8,
    zIndex: 0,
  },
  bg: {
    backgroundColor: 'rgba(3, 133, 255, 0.2)',
    // color: '#ffffff',
    // backgroundColor: 'rgba(11, 197, 116, 0.27)',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyHeader: {
    marginBottom: 8,
    flex: 1,
  },
  bodyFooter: {
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#22272B',
  },
  price: {
    fontFamily: 'Roboto-Light',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#22272B',
  },
  totalPrice: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#40bfff',
  },
});

export default React.memo(ProductCardOfDetails);
