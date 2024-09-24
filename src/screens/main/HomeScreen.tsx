import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useGetCustomerAllQuery} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import CustomerCard from '../../components/common/CustomerCard/CustomerCard';
import {RootStackParamList} from '../../routes/RootNavigator';

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

  return (
    <Container paddingHorizontal={0}>
      <CustomerCard />

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
