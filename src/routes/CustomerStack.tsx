import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CustomerHome from '../screens/customer/CustomerHome';
import CustomerOrder from '../screens/customer/CustomerOrder';
import CustomerVisit from '../screens/customer/CustomerVisit';
import {ITabBarIconProps} from '../types/type';
import CustomerReport from '../screens/customer/CustomerReport';

export type CustomerStackParamList = {
  CustomerHome: undefined;
  CustomerOrder: undefined;
  CustomerVisit: undefined;
  CustomerReport: undefined;
};

const Tab = createBottomTabNavigator<CustomerStackParamList>();

const CustomerStack = () => {
  // Icons
  const icon = useCallback(
    ({color, size, name}: ITabBarIconProps) => (
      <Icon name={name} color={color} size={size} />
    ),
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName="CustomerHome"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#7e919a',
        tabBarActiveTintColor: '#22282b',

        tabBarStyle: {
          position: 'absolute',
          // backgroundColor: 'transparent',
          minHeight: 64,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Asosiy',
          tabBarIcon: props => icon({...props, name: 'bar-chart-2'}),
        }}
      />
      <Tab.Screen
        name="CustomerOrder"
        component={CustomerOrder}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Buyurtma',
          tabBarIcon: props => icon({...props, name: 'shopping-bag'}),
        }}
      />
      <Tab.Screen
        name="CustomerVisit"
        component={CustomerVisit}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Tashrif',
          tabBarIcon: props => icon({...props, name: 'compass'}),
        }}
      />
      <Tab.Screen
        name="CustomerReport"
        component={CustomerReport}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Hisobot',
          tabBarIcon: props => icon({...props, name: 'file-text'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(CustomerStack);
