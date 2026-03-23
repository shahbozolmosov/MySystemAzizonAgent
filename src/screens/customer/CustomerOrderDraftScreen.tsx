import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import {IOrderDraftCard} from '../../components/common/OrderDraftCard/OrderDraftCard.tsx';
import OrderDraftCardList from '../../components/common/OrderDraftCard/OrderDraftCardList.tsx';
import NoResult from '../../components/errors/NoResult/NoResult.tsx';
import {getOrderDraftsByClientId} from '../../database/orderDraft.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';

type CustomerOrderDraftScreenProps = MaterialTopTabScreenProps<
    CustomerOrderHistoryTabStackParamList,
    'OrderDraft'
>;

const CustomerOrderDraftScreen = ({route}: CustomerOrderDraftScreenProps) => {
    // Route
    const {customerId} = route.params;

    // State
    const [orderData, setOrderData] = useState<IOrderDraftCard[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const initDB = async () => {
            try {
                const db = await getDBConnection();
                const data = await getOrderDraftsByClientId(db, customerId);

                if (data) {
                    setOrderData(data);
                }
            } catch (err) {
                console.error('Failed to initialize database', err);
            }
        };

        if (isFocused) {
            initDB();
        }
    }, [customerId, isFocused]);

    return (
        <Container>
            {orderData.length === 0 ? (
                <NoResult
                    title="Qoralamalar topilmadi"
                    desc="Hozircha sizda qoralamalar mavjud emas!"
                />
            ) : (
                <OrderDraftCardList list={orderData} />
            )}
        </Container>
    );
};

export default React.memo(CustomerOrderDraftScreen);
