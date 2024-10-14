import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {AppDrawerStackParamList} from '../../../routes/App/AppRootStack.tsx';
import { AddOrderDraft, createOrdersDraftTable, OrderDraft } from '../../../database/tables/orderDraft.table.ts';
import { useTypesSelector } from '../../../app/store.ts';
import { clearOrderProduct, selectedOrderDraftProducts, setOrderDraftProductMultiple } from '../../../app/services/order/orderSlice.ts';
import { OrderAdd, useAddProductOrderMutation } from '../../../app/services/order/order.ts';
import { getDBConnection } from '../../../database/sqlite.ts';
import { getOrderDraftById, removeOrderDraftById, updateOrderDraft } from '../../../database/orderDraft.ts';
import PaymentDetailsCard, { PaymentDetailsCardProps } from '../../../components/common/PaymentDetailsCard/PaymentDetailsCard.tsx';
import { handleError } from '../../../utils/errorHandler.ts';
import Container from '../../../components/common/Container/Container.tsx';
import CustomerHeaderOperation from '../../../components/customer/CustomerOperation/CustomerHeaderOperation.tsx';
import SectionTitle from '../../../components/ui/SectionTitle/SectionTitle.tsx';
import OrderDraftProductCardList from '../../../components/common/OrderDraftProductCard/OrderDraftProductCardList.tsx';
import OrderDraftProductAddCard from '../../../components/common/OrderDraftProductCard/OrderDraftProductAddCard.tsx';

type AppOrderDraftDetailsScreenProps = NativeStackScreenProps<
    AppDrawerStackParamList,
    'AppOrderDraftDetails'
>;

const CustomerOrderDraftDetailsScreen = ({
    route,
    navigation,
}: AppOrderDraftDetailsScreenProps) => {
    // Route
    const {orderId, customerId} = route.params;

    // State
    const [isLoadingDraft, setIsLoadingDraft] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderDbData, setOrderDbData] = useState<OrderDraft | null>(null);

    // Dispatch
    const dispatch = useDispatch();

    const selectedProducts = useTypesSelector(selectedOrderDraftProducts);

    // API
    const [addData] = useAddProductOrderMutation();

    useEffect(() => {
        const initDB = async () => {
            const db = await getDBConnection();

            const order = await getOrderDraftById(db, orderId);

            if (order) {
                if (
                    order.product_list &&
                    Array.isArray(order.product_list) &&
                    order.product_list.length > 0
                ) {
                    dispatch(setOrderDraftProductMultiple(order.product_list));
                }
                setOrderDbData(order);
            }
        };

        // if (isFocused) {
        initDB();
        // }
    }, [dispatch, orderId]);

    useEffect(() => {
        const beforeRemoveListener = navigation.addListener(
            'beforeRemove',
            e => {
                e.preventDefault();

                Alert.alert(
                    'Diqqat!',
                    "Agar orqaga qaytadigan bo'lsangiz ma'lumotlar saqlanmaydi?",
                    [
                        {
                            text: 'Bekor qilish',
                            style: 'cancel',
                            onPress: () => {},
                        },
                        {
                            text: 'Ha',
                            style: 'destructive',

                            onPress: () => {
                                dispatch(clearOrderProduct());
                                navigation.dispatch(e.data.action);
                            },
                        },
                    ],
                    {cancelable: true},
                );
            },
        );
        return () =>
            navigation.removeListener('beforeRemove', beforeRemoveListener);
    }, [dispatch, navigation]);

    const getNumber = useCallback((value: string) => {
        if (value) {
            return parseFloat(value);
        }
        return 0;
    }, []);

    const paymentData = useMemo<PaymentDetailsCardProps>(() => {
        if (orderDbData) {
            const productTotalPrice = selectedProducts.reduce(
                (a, b) => a + getNumber(b.inputAmount) * b.price,
                0,
            );

            return {
                productCount: selectedProducts.length,
                productAmount: selectedProducts.reduce(
                    (a, b) => a + getNumber(b.inputAmount),
                    0,
                ),
                productTotalPrice,
                tasdiqlangan_chegirma: 0,
                tolov_summa: 0,
            };
        }

        return {
            productCount: 0,
            productAmount: 0,
            productTotalPrice: 0,
            tasdiqlangan_chegirma: 0,
            tolov_summa: 0,
        };
    }, [orderDbData, getNumber, selectedProducts]);

    const handleNavigate = useCallback(() => {
        navigation.push('AppOrderDraftAddProduct', {
            customerId,
            orderId,
        });
    }, [customerId, navigation, orderId]);

    // Handle submit
    const handleSaveDraft = useCallback(async () => {
        if (!orderDbData) {
            Toast.show({
                type: 'error',
                text1: "Buyurtmart ma'lumotlari topilmadi",
                text2: "Qaytadan urinib ko'ring yoki biz bilan bog'laning",
            });
            return;
        }

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

        try {
            const data: AddOrderDraft = {
                client_id: customerId,
                product_list: selectedProducts,
                izoh: orderDbData.izoh,
                izoh_dostavka: orderDbData.izoh_dostavka,
                alohida: orderDbData.alohida,
                lat: orderDbData.lat,
                lon: orderDbData.lon,
            };

            // DB
            const db = await getDBConnection();

            await createOrdersDraftTable(db);
            const res = await updateOrderDraft(db, orderId, data);

            if (res === 'ok' || false) {
                Toast.show({
                    type: 'success',
                    text1: 'Qoralama yangilandi saqlandi',
                });

                dispatch(clearOrderProduct());

                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: "Qoralamani yangilab bo'lmadi",
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
        dispatch,
        getNumber,
        navigation,
        orderDbData,
        orderId,
        selectedProducts,
    ]);

    // Handle submit
    const handleSubmit = useCallback(async () => {
        if (!orderDbData) {
            Toast.show({
                type: 'error',
                text1: "Buyurtmart ma'lumotlari topilmadi",
                text2: "Qaytadan urinib ko'ring yoki biz bilan bog'laning",
            });
            return;
        }

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
                izoh: orderDbData.izoh,
                izoh_dostavka: orderDbData.izoh_dostavka,
                alohida: Boolean(orderDbData.alohida),
                lat: orderDbData.lat,
                lon: orderDbData.lon,
            };

            const res = await addData(data).unwrap();

            if (res.success) {
                Toast.show({
                    type: 'success',
                    text1: res.message,
                });

                const db = await getDBConnection();
                await removeOrderDraftById(db, orderId);

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
        getNumber,
        navigation,
        orderDbData,
        orderId,
        selectedProducts,
    ]);

    return !orderDbData ? (
        <Container>
            <Text>404 | Not found</Text>
        </Container>
    ) : (
        <Container>
            <CustomerHeaderOperation title={`#${orderDbData.uid} - qoralama`} />

            <ScrollView>
                <View style={styles.container}>
                    {/* Products */}
                    <SectionTitle title={'Mahsulotlar'} />
                    <OrderDraftProductCardList
                        list={selectedProducts}
                        orderDraftId={orderId}
                    />
                    {/* Add product btn */}
                    <OrderDraftProductAddCard onPress={handleNavigate} />

                    {/* Payment */}
                    <SectionTitle title={"To'lov"} />
                    <PaymentDetailsCard {...paymentData} />
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
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 14,
    },
    btnWrapper: {
        gap: 20,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderColor: '#F4F4F4',
        backgroundColor: '#ffffff',
    },
});

export default React.memo(CustomerOrderDraftDetailsScreen);
