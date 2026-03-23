import {Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container/Container';
import AppOrderCardList from '../../../components/common/OrderCard/AppOrderCardList';
import {IOrderCard} from '../../../components/common/OrderCard/OrderCard';
import NoTask from '../../../components/errors/NoTask/NoTask';
import {getAllOrders} from '../../../database/order';
import {getDBConnection} from '../../../database/sqlite';

const AppOrderHistoryProcess = () => {
    // State
    const [orderData, setOrderData] = useState<IOrderCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initDB = async () => {
            setIsLoading(true);
            try {
                const db = await getDBConnection();
                const resDB = await getAllOrders(db, [
                    'new',
                    'tayyorlanmoqda',
                    'tayyorlandi',
                    'tekshirilmoqda',
                    'tekshirildi',
                    'dostavka',
                ]);
                if (resDB) {
                    setOrderData(resDB);
                }
            } catch (err) {
                console.error('Failed to initialize database', err);
            } finally {
                setIsLoading(false);
            }
        };

        initDB();
    }, []);

    return (
        <Container>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : orderData.length === 0 ? (
                <NoTask
                    title="Buyurtmalar topilmadi"
                    desc="Hozircha sizda buyurtmalar mavjud emas!"
                />
            ) : (
                <AppOrderCardList list={orderData} />
            )}
        </Container>
    );
};

export default React.memo(AppOrderHistoryProcess);
