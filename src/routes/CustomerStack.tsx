import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Analytics from '../screens/main/Analytics';
import Home from '../screens/main/Home';

export type AppStackParamList = {
  Home: undefined;
  Analytics: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const CustomerStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Analytics" component={Analytics} />
    </Stack.Navigator>
  );
};

export default React.memo(CustomerStack);
