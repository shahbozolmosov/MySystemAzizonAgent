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
        },
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
          tabBarLabel: 'Analitika',
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(AppStack);
