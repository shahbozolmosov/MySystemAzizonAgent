import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import CustomerOrderAddScreen from '../screens/customer/CustomerOrderAddScreen';
import CustomerOrderScreen from '../screens/customer/CustomerOrderScreen';
import {CustomerTabStackParamList} from './CustomerStack';

const CustomerOrderStack =
  createNativeStackNavigator<CustomerTabStackParamList>();

type CustomerOrderStackProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderStackScreen'
>;

const CustomerOrderStackScreen = ({route}: CustomerOrderStackProps) => {
  const {customerId} = route.params;

  return (
    <CustomerOrderStack.Navigator screenOptions={{headerShown: false}}>
      <CustomerOrderStack.Screen
        name="CustomerOrderScreen"
        component={CustomerOrderScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderAddScreen"
        component={CustomerOrderAddScreen}
        initialParams={{customerId}}
      />
    </CustomerOrderStack.Navigator>
  );
};

export default CustomerOrderStackScreen;
