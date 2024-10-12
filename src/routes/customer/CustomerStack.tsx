import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CustomerHomeScreen from '../../screens/customer/CustomerHomeScreen';
import CustomerOrderAddScreen from '../../screens/customer/CustomerOrderAddScreen';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import CustomerVisitScreen from '../../screens/customer/CustomerVisitScreen';
import AnalyticsScreen from '../../screens/main/AnalyticsScreen';
import {ITabBarIconProps} from '../../types/types';
import CustomerOrderStackScreen from './CustomerOrderStackScreen';
import {RootStackParamList} from '../RootNavigator';
import CustomerDrawerContent from '../../components/common/CustomerDrawerContent/CustomerDrawerContent';

export type CustomerStackParamList = {
  Home: {
    customerId: string;
  };
};
export type CustomerTabStackParamList = {
  CustomerHome: {customerId: string};
  // order
  CustomerOrderStack: {customerId: string};
  CustomerOrderHistory: {customerId: string};
  CustomerOrderAdd: {customerId: string};
  CustomerOrderBasket: {customerId: string};
  CustomerOrderDetails: {customerId: string; orderId: string};
  CustomerOrderDraftDetails: {customerId: string; orderId: string};
  CustomerOrderDraftAddProduct: {customerId: string; orderId: string};

  CustomerVisit: {customerId: string};
  CustomerReport: {customerId: string};
};

const Tab = createBottomTabNavigator<CustomerTabStackParamList>();

type TabNavigationRouteProp = RouteProp<RootStackParamList, 'CustomerStack'>;

const TabNavigation = () => {
  const route = useRoute<TabNavigationRouteProp>();
  const {customerId} = route.params;

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
          minHeight: 84,
          paddingBottom: 30,
        },
      }}>
      <Tab.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        options={{
          tabBarLabel: 'Asosiy',
          tabBarIcon: props => icon({...props, name: 'bar-chart-2'}),
        }}
        initialParams={{customerId}}
      />
      <Tab.Screen
        name="CustomerOrderStack"
        component={CustomerOrderStackScreen}
        options={{
          tabBarLabel: 'Buyurtma',
          tabBarIcon: props => icon({...props, name: 'shopping-bag'}),
          tabBarStyle: {display: 'none'},
        }}
        initialParams={{customerId}}
      />
      <Tab.Screen
        name="CustomerOrderAdd"
        component={CustomerOrderAddScreen}
        options={{
          tabBarLabel: 'Buyurtma',
          tabBarItemStyle: {display: 'none'},
          tabBarShowLabel: false,
        }}
        initialParams={{customerId}}
      />
      <Tab.Screen
        name="CustomerVisit"
        component={CustomerVisitScreen}
        options={{
          tabBarLabel: 'Tashrif',
          tabBarIcon: props => icon({...props, name: 'compass'}),
        }}
        initialParams={{customerId}}
      />
      <Tab.Screen
        name="CustomerReport"
        component={CustomerReportScreen}
        options={{
          tabBarLabel: 'Hisobot',
          tabBarIcon: props => icon({...props, name: 'file-text'}),
        }}
        initialParams={{customerId}}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const CustomerStack = () => {
  const route = useRoute<TabNavigationRouteProp>();
  const {customerId} = route.params;
  const drawerContent = useCallback(() => <CustomerDrawerContent />, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        overlayColor: 'rgba(30, 35, 44, 0.17)',
      }}
      drawerContent={drawerContent}
      >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{drawerLabel: 'Asosiy', drawerItemStyle: {display: 'none'}}}
        initialParams={{customerId}}
      />
      <Drawer.Screen name="Other" component={AnalyticsScreen} />
    </Drawer.Navigator>
  );
};

export default React.memo(CustomerStack);
