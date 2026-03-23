import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootNavigator.tsx';
import Container from '../../components/common/Container/Container.tsx';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../app/services/customer/customer.ts';
import {
  Product,
  useGetProductAllQuery,
} from '../../app/services/product/product.ts';
import {
  Order,
  useGetProductOrderAllQuery,
} from '../../app/services/order/order.ts';
import NoInternet from '../../components/errors/NoInternet/NoInternet.tsx';
import {useDispatch} from 'react-redux';
import {starterSyncOn} from '../../app/services/starter/starterSlice.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {createCustomersTable} from '../../database/tables/customers.table.ts';

import {handleApiResponse} from '../../utils/handleApiResponse.ts';
import {createProductsTable} from '../../database/tables/product.table.ts';
import {
  addMultipleCustomers,
  getAllCustomers,
} from '../../database/customers.ts';
import {addMultipleProducts, getAllProducts} from '../../database/products.ts';
import {addMultipleOrders, getAllOrders} from '../../database/order.ts';
import {createOrdersTable} from '../../database/tables/orders.table.ts';
import { createUserTable } from '../../database/tables/user.table.ts';
import { createOrdersDraftTable } from '../../database/tables/orderDraft.table.ts';
import { createDayTable } from '../../database/tables/day.table.ts';

type StarterScreenProps = NativeStackScreenProps<RootStackParamList, 'Starter'>;

function StarterScreen({navigation}: StarterScreenProps) {
  // State
  const [configLoading, setConfigLoading] = useState<boolean>(false);

  // Dispatch
  const dispatch = useDispatch();

  // API
  const customerRes = useGetCustomerAllQuery();
  const productRes = useGetProductAllQuery(
    {},
    {
      skip: !customerRes.isSuccess,
    },
  );
  const orderRes = useGetProductOrderAllQuery(
    {},
    {
      skip: !customerRes.isSuccess || !productRes.isSuccess,
    },
  );

  const customerData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(customerRes);
  }, [customerRes]);

  const productData = useMemo<Product[]>(() => {
    return handleApiResponse<Product[]>(productRes);
  }, [productRes]);
  const orderData = useMemo<Order[]>(() => {
    return handleApiResponse<Order[]>(orderRes);
  }, [orderRes]);

  useEffect(() => {
    if (customerRes.isSuccess && productRes.isSuccess && orderRes.isSuccess) {
      const initDB = async () => {
        setConfigLoading(true);
        try {
          const db = await getDBConnection();
          // Create tables
          await createDayTable(db);
          await createUserTable(db);
          await createCustomersTable(db);
          await createProductsTable(db);
          await createOrdersTable(db);
          await createOrdersDraftTable(db);

          const allCustomersDB = await getAllCustomers(db);
          const allProductsDB = await getAllProducts(db);
          const allOrdersDB = await getAllOrders(db, []);

          const addedCustomers = customerData.filter(item => {
            if (allCustomersDB && allCustomersDB.length) {
              return (
                allCustomersDB.findIndex(inItem => inItem.id === item.id) === -1
              );
            }
            return true;
          });

          const addedProducts = productData.filter(item => {
            if (allProductsDB && allProductsDB.length) {
              return (
                allProductsDB.findIndex(inItem => inItem.id === item.id) === -1
              );
            }
            return true;
          });

          const addedOrders = orderData.filter(item => {
            if (allOrdersDB && allOrdersDB.length) {
              return (
                allOrdersDB.findIndex(inItem => inItem.id === item.id) === -1
              );
            }
            return true;
          });

          // Set multiple to DB
          await addMultipleCustomers(db, addedCustomers);
          await addMultipleProducts(db, addedProducts);
          await addMultipleOrders(db, addedOrders);

          dispatch(starterSyncOn());
        } catch (err) {
          console.error('Failed to initialize database', err);
        } finally {
          setConfigLoading(false);
        }
      };

      initDB();
    }
  }, [
    customerRes.isSuccess,
    dispatch,
    orderRes.isSuccess,
    productRes.isSuccess,
    navigation,
    customerData,
    productData,
    orderData,
  ]);

  if (!customerRes.isLoading && customerRes.isError) {
    return (
      <Container>
        <NoInternet refetch={customerRes.refetch} />
      </Container>
    );
  }

  if (!productRes.isLoading && productRes.isError) {
    return (
      <Container>
        <NoInternet refetch={productRes.refetch} />
      </Container>
    );
  }

  if (!orderRes.isLoading && orderRes.isError) {
    return (
      <Container>
        <NoInternet refetch={orderRes.refetch} />
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        {customerRes.isLoading || customerRes.isFetching ? (
          <Text style={styles.title}>Mijozlar yuklanmoqda....</Text>
        ) : productRes.isLoading || productRes.isFetching ? (
          <Text style={styles.title}>Mahsulotlar yuklanmoqda....</Text>
        ) : orderRes.isLoading || orderRes.isFetching ? (
          <Text style={styles.title}>Buyurtmalar yuklanmoqda....</Text>
        ) : configLoading ? (
          <Text style={styles.title}>Siz uchun muhit sozlanmoqda....</Text>
        ) : (
          <Text style={styles.title}>Hammasi muvaffaqiyatli</Text>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 30,
    color: '#0d1017',
  },
});

export default React.memo(StarterScreen);
