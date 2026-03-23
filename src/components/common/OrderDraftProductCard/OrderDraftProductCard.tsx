import {Image} from '@rneui/themed';
import React, {useCallback, useMemo} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import ProductImage from '../../../../assets/product.jpg';
import {
  removeOrderDraftProduct,
  selectedOrderDraftProductsById,
  setOrderDraftProduct,
} from '../../../app/services/order/orderSlice';
import {Product} from '../../../app/services/product/product';
import {useTypesSelector} from '../../../app/store';
import {formatComNum} from '../../../utils/formatComNum';

export interface IOrderDraftProductCard extends Product {}
interface OrderDraftProductCardProps extends IOrderDraftProductCard {
  orderDraftId: string;
  deleteBtn?: boolean;
}

const OrderDraftProductCard = (props: OrderDraftProductCardProps) => {
  const {orderDraftId, id, name, article, price, deleteBtn = true} = props;
  const dispatch = useDispatch();

  const product = useTypesSelector(state =>
    selectedOrderDraftProductsById(state, id),
  );

  const handleChange = useCallback(
    (text: string) => {
      const numericValue = text
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1');

      if (numericValue) {
        dispatch(
          setOrderDraftProduct({
            ...props,
            inputAmount: numericValue,
          }),
        );
      } else {
        dispatch(
          setOrderDraftProduct({
            ...props,
            inputAmount: '',
          }),
        );
      }
    },
    [dispatch, props],
  );

  const inputValue = useMemo<string>(() => {
    if (product) {
      return product.inputAmount;
    }
    return '';
  }, [product]);

  const handleRemove = useCallback(async () => {
    if (!orderDraftId) {
      return;
    }

    dispatch(removeOrderDraftProduct(id));
    Toast.show({
      type: 'success',
      text1: "Mahsulot muvaffaqiyatli o'chirildi!",
    });
  }, [dispatch, id, orderDraftId]);

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
          style={[styles.input, inputValue && styles.bg]}
          placeholder="kg"
          value={inputValue}
          defaultValue={inputValue}
          placeholderTextColor={inputValue ? '#8d9bb8' : '#D2D4DA'}
          onChangeText={handleChange}
        />
      </View>
      {deleteBtn && (
        <TouchableOpacity style={styles.removeBtn} onPress={handleOpenDialog}>
          <Icon name="trash" size={16} color={'#1e232c'} />
        </TouchableOpacity>
      )}
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
  },
  bg: {
    backgroundColor: 'rgba(3, 133, 255, 0.2)',
    // color: '#ffffff',
    // backgroundColor: 'rgba(11, 197, 116, 0.27)',
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
    paddingTop: 10,
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
    top: 0,
    right: 14,
  },
});

export default React.memo(OrderDraftProductCard);
