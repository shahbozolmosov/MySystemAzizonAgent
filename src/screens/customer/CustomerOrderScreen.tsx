import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import {CustomerTabStackParamList} from '../../routes/CustomerStack';

type CustomerOrderProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderScreen'
>;

const CustomerOrderScreen = ({navigation, route}: CustomerOrderProps) => {
  // Route
  const {customerId} = route.params;

  // Handle navigate to order add
  const handleNavigate = useCallback(() => {
    navigation.push('CustomerOrderAddScreen', {customerId});
  }, [navigation, customerId]);

  return (
    <Container>
      <CustomerHeaderOperation
        customElements={
          <Button
            title={'Yangi'}
            size="sm"
            color={'secondary'}
            onPress={handleNavigate}
          />
        }
      />
      <MainScrollView>
        <Text>Lorem</Text>
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderScreen);
