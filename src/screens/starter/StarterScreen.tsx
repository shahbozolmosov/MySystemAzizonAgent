import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootNavigator.tsx';
import Container from '../../components/common/Container/Container.tsx';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../app/services/customer/customer.ts';
import {useGetProductAllQuery} from '../../app/services/product/product.ts';
import {useGetProductOrderAllQuery} from '../../app/services/order/order.ts';
import NoInternet from '../../components/errors/NoInternet/NoInternet.tsx';
import {useDispatch} from 'react-redux';
import {starterSyncOn} from '../../app/services/starter/starterSlice.ts';
import {getDBConnection} from '../../database/sqlite.ts';
import {createCustomersTable} from '../../database/tables/customers.table.ts';
import {
  addMultipleCustomers,
  getAllCustomers,
} from '../../database/customers.ts';
import {handleApiResponse} from '../../utils/handleApiResponse.ts';

type StarterScreenProps = NativeStackScreenProps<RootStackParamList, 'Starter'>;

function StarterScreen({route, navigation}: StarterScreenProps) {
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

  useEffect(() => {
    if (customerRes.isSuccess && productRes.isSuccess && orderRes.isSuccess) {
      const initDB = async () => {
        setConfigLoading(true);
        try {
          const db = await getDBConnection();
          // await removeCustomersTable(db);
          await createCustomersTable(db);
          const allCustomersDB = await getAllCustomers(db);

          const addedCustomers = customerData.filter(item => {
            if (allCustomersDB && allCustomersDB.length) {
              return (
                allCustomersDB.findIndex(
                  inItem => inItem.customer_id.toString() === item.id,
                ) === -1
              );
            }
            return true;
          });

          await addMultipleCustomers(db, addedCustomers);

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
