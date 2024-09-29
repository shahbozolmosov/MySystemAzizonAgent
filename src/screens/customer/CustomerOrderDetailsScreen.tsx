import {Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomerTabStackParamList} from '../../routes/customer/CustomerStack.tsx';

type CustomerOrderDetailsScreen = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderDetails'
>;

const CustomerOrderDetailsScreen = ({
  navigation,
  route,
}: CustomerOrderDetailsScreen) => {
  // Route
  const {customerId, orderId} = route.params;

  return (
    <View>
      <Text>
        CustomerOrderDetailsScreen, {customerId} - {orderId}
      </Text>
    </View>
  );
};

export default React.memo(CustomerOrderDetailsScreen);
