import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import HomeScreen from '../screens/main/HomeScreen';

export type AppStackParamList = {
  HomeScreen: undefined;
  AnalyticsScreen: undefined;
};

// const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createMaterialTopTabNavigator<AppStackParamList>();

const AppStack = () => {
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

export default React.memo(AppStack);
