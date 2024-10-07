import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import {IOrderCard} from '../../components/common/OrderCard/OrderCard';
import OrderCardList from '../../components/common/OrderCard/OrderCardList';
import NoResult from '../../components/errors/NoResult/NoResult.tsx';
import {getOrderByCustomerId} from '../../database/order.ts';
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
  const [orderData, setOrderData] = useState<IOrderCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      setIsLoading(true);
      try {
        const db = await getDBConnection();
        const orderByCustomerId = await getOrderByCustomerId(db, customerId, [
          'topshirildisss',
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
        <NoResult
          title="Qoralamalar topilmadi"
          desc="Hozircha sizda qoralamalar mavjud emas!"
        />
      ) : (
        <OrderCardList list={orderData} customerId={customerId} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderDraftScreen);
