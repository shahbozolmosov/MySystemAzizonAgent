import {Image} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
  const {id, name, article, price} = props;
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(props.inputAmount.toString());

  const handleChange = useCallback(
    (text: string) => {
      let numericValue = text.replace(/[^0-9.]/g, '');

      const formatted = formatComNum(numericValue);

      if (numericValue) {
        dispatch(
          setOrderProduct({
            ...props,
            inputAmount: parseFloat(numericValue),
          }),
        );
      } else {
        dispatch(
          setOrderProduct({
            ...props,
            inputAmount: '',
          }),
        );
      }

      setWeight(formatted);
    },
    [dispatch, props],
  );

  const handleRemove = useCallback(() => {
    dispatch(removeOrderProduct(id));
  }, [dispatch, id]);

  const handleOpenDialog = useCallback(() => {
    Alert.alert(
      "O'chirish!",
      "Mahsulotni savatdan o'chirmoqchimisiz?",
      [
        {text: 'Bekor qilish', style: 'cancel', onPress: () => {}},
        {
          text: 'Ha',
          style: 'destructive',

          onPress: () => handleRemove(),
        },
      ],
      {cancelable: true},
    );
  }, [handleRemove]);

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
          style={styles.input}
          placeholder="kg"
          value={weight}
          placeholderTextColor={'#D2D4DA'}
          onChangeText={handleChange}
        />
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={handleOpenDialog}>
        <Icon name="trash" size={16} color={'#1e232c'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 4
  },
  bg: {
    // backgroundColor: 'rgba(3, 133, 255, 0.2)',
    backgroundColor: 'rgba(11, 197, 116, 0.27)',
  },
  image: {
    width: 50,
    height: 50,
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
    paddingTop: 20,
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
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 14,
  },
});

export default React.memo(BasketProductCard);
