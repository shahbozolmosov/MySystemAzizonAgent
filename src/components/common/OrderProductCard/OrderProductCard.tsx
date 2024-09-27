import {Image} from '@rneui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ProductImage from '../../../../assets/product.jpg';
import {
  removeOrderProduct,
  selectedOrderProductsById,
  setOrderProduct,
} from '../../../app/services/order/orderSlice';
import {Product} from '../../../app/services/product/product';
import {useTypesSelector} from '../../../app/store';
import {formatComNum} from '../../../utils/formatComNum';

export interface OrderProductCardProps extends Product {}

const OrderProductCard = (props: OrderProductCardProps) => {
  const {id, name, article, price} = props;
  const dispatch = useDispatch();

  const product = useTypesSelector(state =>
    selectedOrderProductsById(state, id),
  );

  const [weight, setWeight] = useState('');

  const handleChange = useCallback(
    (text: string) => {
      const numericValue = text.replace(/[^0-9.]/g, '');

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

  const inputValue = useMemo<string>(() => {
    if (product) {
      const formatted = formatComNum(product.inputAmount.toString());
      return formatted;
    }
    return '';
  }, [product]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={ProductImage} />
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Text style={styles.title} selectable={true}>
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
          value={inputValue}
          defaultValue={inputValue}
          placeholderTextColor={weight ? '#8d9bb8' : '#D2D4DA'}
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
    backgroundColor: 'rgba(3, 133, 255, 0.2)',
    // color: '#ffffff',
    // backgroundColor: 'rgba(11, 197, 116, 0.27)',
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

export default React.memo(OrderProductCard);
