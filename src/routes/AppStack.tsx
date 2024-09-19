import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Analytics from '../screens/main/Analytics';
import Home from '../screens/main/Home';

export type AppStackParamList = {
  Home: undefined;
  Analytics: undefined;
};

// const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createMaterialTopTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Asosiy',
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarLabel: 'Analitika',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
