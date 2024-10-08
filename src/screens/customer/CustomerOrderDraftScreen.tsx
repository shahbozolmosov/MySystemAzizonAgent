import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {Text} from '@rneui/themed';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      setIsLoading(true);
      try {
        const db = await getDBConnection();
        const data = await getOrderDraftsByClientId(db, customerId);

        if (data) {
          setOrderData(data);
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
        <OrderDraftCardList list={orderData} customerId={customerId} />
      )}
    </Container>
  );
};

export default React.memo(CustomerOrderDraftScreen);
