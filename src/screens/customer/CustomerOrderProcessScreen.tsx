import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {useGetProductOrderAllQuery} from '../../app/services/order/order';
import Container from '../../components/common/Container/Container';
import OrderCard, {
  IOrderCard,
} from '../../components/common/OrderCard/OrderCard';
import OrderCardList from '../../components/common/OrderCard/OrderCardList';
import {CustomerOrderHistoryTabStackParamList} from '../../routes/customer/CustomerOrderHistoryTabStack';
import {handleApiResponse} from '../../utils/handleApiResponse';
import {Text} from '@rneui/themed';
import NoTask from '../../components/errors/NoTask/NoTask.tsx';
import NoInternet from '../../components/errors/NoInternet/NoInternet.tsx';
import {getDBConnection} from '../../database/sqlite.ts';
import {getAllOrders} from '../../database/order.ts';

type CustomerOrderProcessScreenProps = MaterialTopTabScreenProps<
  CustomerOrderHistoryTabStackParamList,
  'Process'
>;

const CustomerOrderProcessScreen = ({
  route,
}: CustomerOrderProcessScreenProps) => {
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
        const allOrder = await getAllOrders(db);

        if (allOrder) {
          setOrderData(allOrder);
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
          desc="Hozircha sizda mahsulotlar mavjud emas!"
        />
      ) : (
        <OrderCardList list={orderData} customerId={customerId} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderProcessScreen);
