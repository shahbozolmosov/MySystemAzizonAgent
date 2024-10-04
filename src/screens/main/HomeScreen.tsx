import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import CustomerCardList from '../../components/customer/CustomerCard/CustomerCardList';
import {getDBConnection} from '../../database/sqlite.ts';
import {getAllCustomers} from '../../database/customers.ts';
import {ICustomerCard} from '../../components/customer/CustomerCard/CustomerCard.tsx';
import SyncBtn from '../../components/common/SyncBtn/SyncBtn.tsx';
import {removeCustomersTable} from '../../database/tables/customers.table.ts';
import {Text, TouchableOpacity} from 'react-native';
import {getAllProducts} from '../../database/products.ts';

function HomeScreen() {
  // State
  const [customerData, setCustomerData] = useState<ICustomerCard[]>([]);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        const allCustomer = await getAllCustomers(db);
        const allProducts = await getAllProducts(db);

        console.log('allProducts📦📦📦📦📦',allProducts)

        if (allCustomer) {
          setCustomerData(allCustomer);
        }
      } catch (err) {
        console.error('Failed to initialize database', err);
      }
    };

    initDB();
  }, []);

  const handleClear = async () => {
    const db = await getDBConnection();
    await removeCustomersTable(db);
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <CustomerCardList list={customerData} />

      <SyncBtn />
    </Container>
  );
}

export default React.memo(HomeScreen);
