import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Input} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {ICustomer} from '../../app/services/customer/customer';
import {
  OrderAdd,
  useAddProductOrderMutation,
} from '../../app/services/order/order';
import {
  clearOrderProduct,
  selectedOrderProducts,
} from '../../app/services/order/orderSlice';
import {useTypesSelector} from '../../app/store';
import BasketProductCardList from '../../components/common/BasketProductCard/BasketProductCardList';
import Container from '../../components/common/Container/Container';
import CustomerOrderCard from '../../components/common/CustomerOrderCard/CustomerOrderCard';
import TotalListCard, {
  TotalCardProps,
} from '../../components/common/TotalCard/TotalCard';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import EmptyBasket from '../../components/errors/EmptyBasket/EmptyBasket';
import IconButton from '../../components/ui/IconButton/IconButton';
import {getCustomerById} from '../../database/customers';
import {addOrderDraft} from '../../database/orderDraft';
import {getDBConnection} from '../../database/sqlite';
import {
  AddOrderDraft,
  createOrdersDraftTable,
} from '../../database/tables/orderDraft.table';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack';
import {handleError} from '../../utils/errorHandler';
import {getLocation} from '../../utils/getLocation';

type CustomerOrderBasketScreenProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderBasket'
>;

const CustomerOrderBasketScreen = ({
  navigation,
  route,
}: CustomerOrderBasketScreenProps) => {
  // Route
  const {customerId} = route.params;

  // State
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);

  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [descSupplier, setDescSupplier] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  // Dispatch
  const dispatch = useDispatch();

  // Store
  const selectedProducts = useTypesSelector(selectedOrderProducts);

  // API
  const [addData] = useAddProductOrderMutation();

  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      const customer = await getCustomerById(db, customerId);
      if (customer) {
        setCustomerData(customer);
      }
    };

    initDB();
  }, [customerId]);

  const getNumber = useCallback((value: string) => {
    if (value) {
      return parseFloat(value);
    }
    return 0;
  }, []);

  // Total data
  const totalData = useMemo<TotalCardProps>(() => {
    const massa = selectedProducts.reduce((a, b) => {
      const number = getNumber(b.inputAmount);
      if (number) {
        return a + number;
      }
      return a;
    }, 0);

    const discountPrice = selectedProducts.reduce((a, b) => {
      const number = getNumber(b.inputAmount);
      if (number) {
        return a + number * b.price;
      }
      return a;
    }, 0);

    const realPrice = selectedProducts.reduce((a, b) => {
      const number = getNumber(b.inputAmount);
      if (number) {
        return a + number * b.real_price;
      }
      return a;
    }, 0);

    const discountVal = realPrice - discountPrice;

    const percent = realPrice > 0 ? (discountVal / realPrice) * 100 : 0;

    return {
      amount: selectedProducts.length,
      massa,
      price: realPrice,
      discount: discountVal <= 0 ? 0 : -discountVal,
      discountPercent: Math.round(percent),
      payment: discountPrice,
    };
  }, [getNumber, selectedProducts]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleSwitch = useCallback(() => {
    setIsEnabled(previousState => !previousState);
  }, []);

  // Handle submit
  const handleSaveDraft = useCallback(async () => {
    setIsLoadingDraft(true);

    if (
      selectedProducts.find(
        item => !item.inputAmount || getNumber(item.inputAmount) < 0,
      )
    ) {
      Toast.show({
        type: 'error',
        text1: 'Buyurtma bajarilmadi',
        text2: "Mahsulot miqdori to'g'ri kiritilmagan",
      });
      setIsLoadingDraft(false);
      return;
    }

    const location = await getLocation();
    if (!location) {
      Toast.show({
        type: 'error',
        text1: 'Buyurtma bajarilmadi',
        text2: 'Buyurtma bajarilishi uchun sizning manzilingiz olinishi kerak.',
      });
      setIsLoadingDraft(false);
      return;
    }

    try {
      const data: AddOrderDraft = {
        client_id: customerId,
        product_list: selectedProducts,
        izoh: desc,
        izoh_dostavka: descSupplier,
        alohida: isEnabled,
        lat: location.latitude,
        lon: location.longitude,
      };

      // DB
      const db = await getDBConnection();

      // await removeOrdersDraftTable(db);
      // return;

      await createOrdersDraftTable(db);
      const res = await addOrderDraft(db, data);

      if (res === 'ok' || false) {
        Toast.show({
          type: 'success',
          text1: 'Qoralamaga muvaffaqiyatli saqlandi',
        });

        dispatch(clearOrderProduct());

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: "Qoralamaga saqlab bo'lmadi",
          text2: "Qaytadan urinib ko'ring",
        });
      }
    } catch (err) {
      console.log('❌ Order draft error', err);
    } finally {
      setIsLoadingDraft(false);
    }
  }, [
    customerId,
    desc,
    descSupplier,
    dispatch,
    getNumber,
    isEnabled,
    navigation,
    selectedProducts,
  ]);

  // Handle submit
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    if (
      selectedProducts.find(
        item => !item.inputAmount || getNumber(item.inputAmount) < 0,
      )
    ) {
      Toast.show({
        type: 'error',
        text1: 'Buyurtma bajarilmadi',
        text2: "Mahsulot miqdori to'g'ri kiritilmagan",
      });
      setIsLoading(false);
      return;
    }

    const location = await getLocation();
    if (!location) {
      Toast.show({
        type: 'error',
        text1: 'Buyurtma bajarilmadi',
        text2: 'Buyurtma bajarilishi uchun sizning manzilingiz olinishi kerak.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const data: OrderAdd = {
        client_id: customerId,
        product_list: selectedProducts.map(item => ({
          product_id: item.id,
          aritcle: item.article,
          massa: getNumber(item.inputAmount) || 0,
          price: item.price,
          price_chegirma: item.real_price,
        })),
        izoh: desc,
        izoh_dostavka: descSupplier,
        alohida: isEnabled,
        lat: location.latitude,
        lon: location.longitude,
      };

      const res = await addData(data).unwrap();

      if (res.success) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: res.message,
        });
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    addData,
    customerId,
    desc,
    descSupplier,
    getNumber,
    isEnabled,
    navigation,
    selectedProducts,
  ]);

  return (
    <Container>
      <CustomerHeaderOperation
        title="Mening savatim"
        customElements={
          <IconButton
            icon="shopping-bag"
            badgeShown={true}
            badgeAmount={selectedProducts.length}
          />
        }
      />

      {!selectedProducts.length ? (
        <EmptyBasket onGoBack={handleBack} />
      ) : (
        <>
          <ScrollView style={styles.body}>
            {customerData && <CustomerOrderCard {...customerData} />}

            <TotalListCard {...totalData} />
            <BasketProductCardList list={selectedProducts} />

            <View style={styles.descInputBox}>
              <Text style={styles.descInputBoxTitle}>Izohlarni kiriting</Text>
              <Input placeholder="Izoh" value={desc} onChangeText={setDesc} />
              <Input
                placeholder="Dostavka uchun"
                value={descSupplier}
                onChangeText={setDescSupplier}
              />
              <View style={styles.switchBox}>
                <Switch
                  trackColor={{false: '#C4C4C4', true: '#0080ff'}}
                  thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#D9D9D9"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />

                <Text style={styles.descInputBoxTitle}>Yangi buyurtma</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              color={'error'}
              title={`Qoralamaga saqlash (${selectedProducts.length})`}
              type="outline"
              onPress={handleSaveDraft}
              loading={isLoadingDraft}
              disabled={isLoading}
            />
            <Button
              color={'secondary'}
              title={`Buyurtmani yuborish (${selectedProducts.length})`}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoadingDraft}
            />
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btnWrapper: {
    gap: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#F4F4F4',
    backgroundColor: '#ffffff',
  },
  descInputBoxTitle: {
    marginVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1e232c',
  },
  descInputBox: {
    padding: 4,
    marginVertical: 40,
    borderRadius: 10,

    borderTopWidth: 1,
    borderColor: '#F4F4F4',
  },
  switchBox: {
    flexDirection: 'row',
  },
});

export default React.memo(CustomerOrderBasketScreen);
