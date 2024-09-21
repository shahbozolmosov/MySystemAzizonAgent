import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import AppHeader from '../components/common/AppHeader/AppHeader';
import DrawerProfile from '../components/common/DrawerProfile/DrawerProfile';
import DrawerItemBtn, {
  DrawerItemBtnProps,
} from '../components/ui/DrawerItemBtn/DrawerItemBtn';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import HomeScreen from '../screens/main/HomeScreen';

export type AppTabStackParamList = {
  Home: undefined;
  Analytics: undefined;
};

type AppDrawerStackParamList = {
  TabStack: undefined;
  CreateCustomer: undefined;
  AllOrderHistory: undefined;
  CustomerReport: undefined;
};

const Tab = createMaterialTopTabNavigator<AppTabStackParamList>();
const Drawer = createDrawerNavigator<AppDrawerStackParamList>();

const AppTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: '700',
        },
        tabBarAllowFontScaling: false,
        tabBarInactiveTintColor: '#7e919a',
        tabBarActiveTintColor: '#0d96fa',
        tabBarIndicatorStyle: {
          borderRadius: 16,
          backgroundColor: '#0d96fa',
        },
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Asosiy',
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Jami',
        }}
      />
    </Tab.Navigator>
  );
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <>
      <DrawerProfile />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
}

const AppStack = () => {
  const myHeader = useCallback(({navigation}: DrawerHeaderProps) => {
    return <AppHeader drawerNavigation={navigation} />;
  }, []);

  const drawerContent = useCallback(
    (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />,
    [],
  );

  const item = useCallback((props: DrawerItemBtnProps) => {
    return <DrawerItemBtn {...props} />;
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        header: myHeader,
      }}
      drawerContent={drawerContent}>
      <Drawer.Screen
        name="TabStack"
        component={AppTabStack}
        options={{
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="AllOrderHistory"
        component={AppTabStack}
        options={{
          drawerLabel: props => item(props),
          drawerItemStyle: {
            marginHorizontal: 20,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default React.memo(AppStack);
