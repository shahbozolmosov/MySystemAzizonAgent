import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import CustomerOrderScreen from '../screens/customer/CustomerOrderScreen';
import CustomerVisitScreen from '../screens/customer/CustomerVisitScreen';
import {ITabBarIconProps} from '../types/type';
import CustomerReportScreen from '../screens/customer/CustomerReportScreen';

export type CustomerStackParamList = {
  CustomerHomeScreen: undefined;
  CustomerOrderScreen: undefined;
  CustomerVisitScreen: undefined;
  CustomerReportScreen: undefined;
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
      initialRouteName="CustomerHomeScreen"
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
        name="CustomerHomeScreen"
        component={CustomerHomeScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Asosiy',
          tabBarIcon: props => icon({...props, name: 'bar-chart-2'}),
        }}
      />
      <Tab.Screen
        name="CustomerOrderScreen"
        component={CustomerOrderScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Buyurtma',
          tabBarIcon: props => icon({...props, name: 'shopping-bag'}),
        }}
      />
      <Tab.Screen
        name="CustomerVisitScreen"
        component={CustomerVisitScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Tashrif',
          tabBarIcon: props => icon({...props, name: 'compass'}),
        }}
      />
      <Tab.Screen
        name="CustomerReportScreen"
        component={CustomerReportScreen}
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
