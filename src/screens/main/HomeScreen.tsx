import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import {useGetCustomerAllQuery} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
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
  console.log('🚀 ~ HomeScreen ~ customerRes:', customerRes.data);

  return (
    <Container>
      <Text>HomeScreen</Text>

      <Button
        type="clear"
        title={'Go to customer home'}
        onPress={() => navigation.push('CustomerStack')}
      />
    </Container>
  );
}

export default React.memo(HomeScreen);
