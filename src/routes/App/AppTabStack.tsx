import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import AnalyticsScreen from '../../screens/main/AnalyticsScreen';
import HomeScreen from '../../screens/main/HomeScreen';
import AppHeader from '../../components/common/AppHeader/AppHeader.tsx';

export type AppTabStackParamList = {
  Home: undefined;
  Analytics: undefined;
};

const Tab = createMaterialTopTabNavigator<AppTabStackParamList>();

const AppTabStack = () => {
  return (
    <>
      <AppHeader />
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
    </>
  );
};

export default React.memo(AppTabStack);
