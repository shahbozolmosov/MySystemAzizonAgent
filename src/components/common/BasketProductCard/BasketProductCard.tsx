import {Image} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ProductImage from '../../../../assets/product.jpg';
import {
  OrderProduct,
  removeOrderProduct,
  setOrderProduct,
} from '../../../app/services/order/orderSlice';
import {formatComNum} from '../../../utils/formatComNum';

export interface BasketProductCardProps extends OrderProduct {}

const BasketProductCard = (props: BasketProductCardProps) => {
  const {name, article, price} = props;
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(props.inputAmount.toString());

  const handleChange = useCallback(
    (text: string) => {
      const numericValue = text.replace(/[^0-9.]/g, '');
      console.log('🚀 ~ OrderProductCard ~ numericValue:', numericValue);

      const formatted = formatComNum(numericValue);

      if (numericValue) {
        dispatch(
          setOrderProduct({
            ...props,
            inputAmount: parseFloat(numericValue),
          }),
        );
      } else {
        dispatch(removeOrderProduct(props.id));
      }

      setWeight(formatted);
    },
    [dispatch, props],
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={ProductImage} />
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Text style={styles.title}>
            {name}[{article}]
          </Text>
          <Text style={styles.price}>
            {formatComNum(price.toString())} so'm
          </Text>
        </View>
      </View>
      <View style={styles.bodyFooter}>
        <TextInput
          dataDetectorTypes={'flightNumber'}
          keyboardType="number-pad"
          style={[styles.input, weight && styles.bg]}
          placeholder="kg"
          value={weight}
          placeholderTextColor={'#D2D4DA'}
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bg: {
    // backgroundColor: 'rgba(3, 133, 255, 0.2)',
    backgroundColor: 'rgba(11, 197, 116, 0.27)',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  body: {
    flex: 1,
  },
  bodyHeader: {
    marginBottom: 8,
  },
  bodyFooter: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: '#22272B',
  },
  price: {
    fontFamily: 'Roboto-Light',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#22272B',
  },
  input: {
    borderRadius: 6,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 100,

    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#22272B',
  },
});

export default React.memo(BasketProductCard);
