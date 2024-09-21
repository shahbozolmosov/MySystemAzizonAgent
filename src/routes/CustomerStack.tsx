import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CustomerHeader from '../components/common/CustomerHeader/CustomerHeader';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import CustomerOrderScreen from '../screens/customer/CustomerOrderScreen';
import CustomerReportScreen from '../screens/customer/CustomerReportScreen';
import CustomerVisitScreen from '../screens/customer/CustomerVisitScreen';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import {ITabBarIconProps} from '../types/type';

export type CustomerStackParamList = {
  CustomerHomeScreen: undefined;
  CustomerOrderScreen: undefined;
  CustomerVisitScreen: undefined;
  CustomerReportScreen: undefined;
};

const Tab = createBottomTabNavigator<CustomerStackParamList>();

const TabNavigation = () => {
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const CustomerStack = () => {
  const myHeader = useCallback(
    ({navigation, route, options}: DrawerHeaderProps) => {
      return <CustomerHeader drawerNavigation={navigation} />;
    },
    [],
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerShown: false,
        header: myHeader,
        overlayColor: 'rgba(30, 35, 44, 0.17)',
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{drawerLabel: 'Asosiy', drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen name="Other" component={AnalyticsScreen} />
    </Drawer.Navigator>
  );
};

export default React.memo(CustomerStack);
