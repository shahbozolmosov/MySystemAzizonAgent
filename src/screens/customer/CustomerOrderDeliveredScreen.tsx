import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import {IOrderCard} from '../../components/common/OrderCard/OrderCard';
import OrderCardList from '../../components/common/OrderCard/OrderCardList';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';
import {Text} from '@rneui/themed';
import NoTask from '../../components/errors/NoTask/NoTask.tsx';
import {getDBConnection} from '../../database/sqlite.ts';
import {getOrderByCustomerId} from '../../database/order.ts';

type CustomerOrderDeliveredScreenProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Delivered'
>;

const CustomerOrderDeliveredScreen = ({
  route,
}: CustomerOrderDeliveredScreenProps) => {
  // Route
  const {customerId} = route.params;

  // State
  const [orderData, setOrderData] = useState<IOrderCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      setIsLoading(true);
      try {
        const db = await getDBConnection();
        const orderByCustomerId = await getOrderByCustomerId(db, customerId, [
          'topshirildi',
        ]);

        if (orderByCustomerId) {
          setOrderData(orderByCustomerId);
        }
      } catch (err) {
        console.error('Failed to initialize database', err);
      } finally {
        setIsLoading(false);
      }
    };

    initDB();
  }, [customerId]);

  return (
    <Container>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : orderData.length === 0 ? (
        <NoTask
          title="Buyurtmalar topilmadi"
          desc="Hozircha sizda yetkazilgan buyurtmalar mavjud emas!"
        />
      ) : (
        <OrderCardList list={orderData} customerId={customerId} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderDeliveredScreen);
