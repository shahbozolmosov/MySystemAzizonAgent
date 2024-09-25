import {Image} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ProductImage from '../../../../assets/product.jpg';

const OrderProductCard = () => {
  const [weight, setWeight] = useState('');

  const handleChange = useCallback((text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');

    const formatted = numericValue
      .split('.')
      .map((part, index) =>
        index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : part,
      )
      .join('.');

    setWeight(formatted);
  }, []);

  return (
    <View style={[styles.container, weight && styles.bg]}>
      <Image style={styles.image} source={ProductImage} />
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Text style={styles.title}>Афзал[20020]</Text>
        </View>
        <View style={styles.bodyFooter}>
          <Text style={styles.price}>138 200 so'm</Text>
          <TextInput
            dataDetectorTypes={'flightNumber'}
            keyboardType="number-pad"
            style={styles.input}
            placeholder="0.00kg"
            value={weight}
            onChangeText={handleChange}
          />
        </View>
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
  bodyHeader: {},
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
