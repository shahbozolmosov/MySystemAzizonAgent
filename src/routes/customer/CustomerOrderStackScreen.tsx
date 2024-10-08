import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import CustomerOrderAddScreen from '../../screens/customer/CustomerOrderAddScreen';
import CustomerOrderBasketScreen from '../../screens/customer/CustomerOrderBasketScreen';
import CustomerOrderDetailsScreen from '../../screens/customer/CustomerOrderDetailsScreen.tsx';
import CustomerOrderDraftDetailsScreen from '../../screens/customer/CustomerOrderDraftDetailsScreen.tsx';
import CustomerOrderHistoryTabStack from './CustomerOrderHistoryTabStack';
import {CustomerTabStackParamList} from './CustomerStack';
import CustomerOrderDraftAddProductScreen from '../../screens/customer/CustomerOrderDraftAddProductScreen.tsx';

type CustomerOrderStackProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderStack'
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
        name="CustomerOrderAdd"
        component={CustomerOrderAddScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderBasket"
        component={CustomerOrderBasketScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderDetails"
        component={CustomerOrderDetailsScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderDraftDetails"
        component={CustomerOrderDraftDetailsScreen}
        initialParams={{customerId}}
      />
      <CustomerOrderStack.Screen
        name="CustomerOrderDraftAddProduct"
        component={CustomerOrderDraftAddProductScreen}
        initialParams={{customerId}}
      />
    </CustomerOrderStack.Navigator>
  );
};

export default CustomerOrderStackScreen;
