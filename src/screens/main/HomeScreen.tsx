import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import {useGetCustomerAllQuery} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import {RootStackParamList} from '../../routes/RootNavigator';
import CustomerCard from '../../components/common/CustomerCard/CustomerCard';

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
    <Container>
      <Text>HomeScreen</Text>

      <CustomerCard />

      <Text>{JSON.stringify(customerRes.data, null, 2)}</Text>

      <Button
        type="clear"
        title={'Go to customer home'}
        onPress={() => navigation.push('CustomerStack')}
      />
    </Container>
  );
}

export default React.memo(HomeScreen);
