import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import AppHeader from '../components/common/AppHeader/AppHeader';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import HomeScreen from '../screens/main/HomeScreen';

export type AppTabStackParamList = {
  HomeScreen: undefined;
  AnalyticsScreen: undefined;
};

type AppDrawerStackParamList = {
  TabStack: undefined;
};

const Tab = createMaterialTopTabNavigator<AppTabStackParamList>();
const Drawer = createDrawerNavigator<AppDrawerStackParamList>();

const AppTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
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
        },
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Asosiy',
        }}
      />
      <Tab.Screen
        name="AnalyticsScreen"
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

const AppStack = () => {
  const myHeader = useCallback(({navigation}: DrawerHeaderProps) => {
    return <AppHeader drawerNavigation={navigation} />;
  }, []);

  const drawerContent = useCallback(
    (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />,
    [],
  );

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
    </Drawer.Navigator>
  );
};

export default React.memo(AppStack);
