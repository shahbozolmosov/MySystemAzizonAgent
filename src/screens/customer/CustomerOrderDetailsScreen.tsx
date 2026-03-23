import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Order} from '../../app/services/order/order.ts';
import Container from '../../components/common/Container/Container.tsx';
import PaymentDetailsCard, {
    PaymentDetailsCardProps,
} from '../../components/common/PaymentDetailsCard/PaymentDetailsCard.tsx';
import ProductCardOfDetailsList from '../../components/common/ProductCardOfDetails/ProductCardOfDetailsList.tsx';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation.tsx';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.tsx';
import {getOrderById} from '../../database/order.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack.tsx';

type CustomerOrderDetailsScreen = NativeStackScreenProps<
    CustomerTabStackParamList,
    'CustomerOrderDetails'
>;

const CustomerOrderDetailsScreen = ({route}: CustomerOrderDetailsScreen) => {
    // Route
    const {orderId} = route.params;

    // State
    const [data, setData] = useState<Order | null>(null);

    useEffect(() => {
        const initDB = async () => {
            const db = await getDBConnection();
            const res = await getOrderById(db, orderId);

            if (res) {
                setData(res);
            }
        };

        initDB();
    }, [orderId]);

    const paymentData = useMemo<PaymentDetailsCardProps>(() => {
        if (data) {
            return {
                productCount: data.mahsulot_soni,
                productAmount: data.buyurtma_massa,
                productTotalPrice: data.tasdiqlangan_summa,
                tasdiqlangan_chegirma: data.tasdiqlangan_chegirma,
                tolov_summa: data.tolov_summa,
            };
        }

        return {
            productCount: 0,
            productAmount: 0,
            productTotalPrice: 0,
            tasdiqlangan_chegirma: 0,
            tolov_summa: 0,
        };
    }, [data]);
    console.log('paymentData-0000000000', paymentData);

    return !data ? (
        <Container>
            <Text>404 | Not found</Text>
        </Container>
    ) : (
        <Container>
            <CustomerHeaderOperation title={`#${data.id}`} />

            <ScrollView>
                <View style={styles.container}>
                    <SectionTitle title={'Mahsulotlar'} />
                    <ProductCardOfDetailsList list={data.product_list} />
                    <SectionTitle title={"To'lov"} />
                    <PaymentDetailsCard {...paymentData} />
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 14,
    },
});

export default React.memo(CustomerOrderDetailsScreen);
