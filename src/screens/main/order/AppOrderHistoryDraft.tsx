import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container/Container';
import AppOrderDraftCardList from '../../../components/common/OrderDraftCard/AppOrderDraftCardList';
import {IOrderDraftCard} from '../../../components/common/OrderDraftCard/OrderDraftCard';
import NoResult from '../../../components/errors/NoResult/NoResult';
import {getOrderDraftAll} from '../../../database/orderDraft';
import {getDBConnection} from '../../../database/sqlite';

const AppOrderHistoryDraft = () => {
    // State
    const [orderData, setOrderData] = useState<IOrderDraftCard[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const initDB = async () => {
            try {
                const db = await getDBConnection();
                const data = await getOrderDraftAll(db);

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
    }, [isFocused]);

    return (
        <Container>
            {orderData.length === 0 ? (
                <NoResult
                    title="Qoralamalar topilmadi"
                    desc="Hozircha sizda qoralamalar mavjud emas!"
                />
            ) : (
                <AppOrderDraftCardList list={orderData} />
            )}
        </Container>
    );
};

export default React.memo(AppOrderHistoryDraft);
