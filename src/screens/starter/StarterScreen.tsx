import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootNavigator.tsx';
import Container from '../../components/common/Container/Container.tsx';
import {useGetCustomerAllQuery} from '../../app/services/customer/customer.ts';
import {useGetProductAllQuery} from '../../app/services/product/product.ts';
import {useGetProductOrderAllQuery} from '../../app/services/order/order.ts';
import NoInternet from '../../components/errors/NoInternet/NoInternet.tsx';

type StarterScreenProps = NativeStackScreenProps<RootStackParamList, 'Starter'>;

function StarterScreen({route, navigation}: StarterScreenProps) {
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
          <Text>Customer downloading....</Text>
        ) : productRes.isLoading || productRes.isFetching ? (
          <Text>Product downloading....</Text>
        ) : orderRes.isLoading || orderRes.isFetching ? (
          <Text>Orders downloading....</Text>
        ) : (
          <Text>Full downloaded</Text>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(StarterScreen);
