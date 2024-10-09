import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {lazy} from 'react';
import CustomerOrderDraftAddProductScreen from '../../screens/customer/CustomerOrderDraftAddProductScreen.tsx';
import {CustomerTabStackParamList} from './CustomerStack';
const CustomerOrderAddScreen = lazy(
  () => import('../../screens/customer/CustomerOrderAddScreen'),
);
const CustomerOrderBasketScreen = lazy(
  () => import('../../screens/customer/CustomerOrderBasketScreen'),
);
const CustomerOrderDetailsScreen = lazy(
  () => import('../../screens/customer/CustomerOrderDetailsScreen.tsx'),
);
const CustomerOrderDraftDetailsScreen = lazy(
  () => import('../../screens/customer/CustomerOrderDraftDetailsScreen.tsx'),
);
const CustomerOrderHistoryTabStack = lazy(
  () => import('./CustomerOrderHistoryTabStack'),
);

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
