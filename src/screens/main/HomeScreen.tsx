import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import CustomerCard from '../../components/common/CustomerCard/CustomerCard';
import {RootStackParamList} from '../../routes/RootNavigator';
import CustomerCardList from '../../components/common/CustomerCard/CustomerCardList';
import {handleApiResponse} from '../../utils/handleApiResponse';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppRootStack'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  // API
  const customerRes = useGetCustomerAllQuery();

  const customerData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(customerRes);
  }, [customerRes]);

  return (
    <Container paddingHorizontal={0}>
      <CustomerCardList list={customerData} />

      {/* <Text>{JSON.stringify(customerRes.data, null, 2)}</Text> */}

      {/* <Button
        type="clear"
        title={'Go to customer home'}
        onPress={() => navigation.push('CustomerStack')}
      /> */}
    </Container>
  );
}

export default React.memo(HomeScreen);
