import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import CustomerCardList from '../../components/customer/CustomerCard/CustomerCardList';
import {getDBConnection} from '../../database/sqlite.ts';
import {getAllCustomers} from '../../database/customers.ts';
import {ICustomerCard} from '../../components/customer/CustomerCard/CustomerCard.tsx';

function HomeScreen() {
  // State
  const [customerData, setCustomerData] = useState<ICustomerCard[]>([]);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        const allCustomer = await getAllCustomers(db);
        if (allCustomer) {
          setCustomerData(allCustomer);
        }
        console.log('allCustomer🎉🎉🎉', JSON.stringify(allCustomer, null, 2));
      } catch (err) {
        console.error('Failed to initialize database', err);
      }
    };

    initDB();
  }, []);

  return (
    <Container>
      <CustomerCardList list={customerData} />
    </Container>
  );
}

export default React.memo(HomeScreen);
