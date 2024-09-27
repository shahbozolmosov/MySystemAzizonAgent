import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import CustomerOrderAddScreen from '../../screens/customer/CustomerOrderAddScreen';
import CustomerOrderBasketScreen from '../../screens/customer/CustomerOrderBasketScreen';
import CustomerOrderHistoryTabStack from './CustomerOrderHistoryTabStack';
import {CustomerTabStackParamList} from './CustomerStack';

type CustomerOrderStackProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderStackScreen'
>;

const CustomerOrderStack =
  createNativeStackNavigator<CustomerTabStackParamList>();

const CustomerOrderStackScreen = ({route}: CustomerOrderStackProps) => {
  const {customerId} = route.params;

  return (
    <CustomerOrderStack.Navigator screenOptions={{headerShown: false}}>
      <CustomerOrderStack.Screen
        name="CustomerOrderHistory"
        component={CustomerOrderHistoryTabStack}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderAddScreen"
        component={CustomerOrderAddScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderBasketScreen"
        component={CustomerOrderBasketScreen}
        initialParams={{customerId}}
      />
    </CustomerOrderStack.Navigator>
  );
};

export default CustomerOrderStackScreen;
