import React from 'react';

// Routes
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {selectedIsAuthenticated} from '../app/services/auth/authSlice';
import {useTypesSelector} from '../app/store';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

const Router = () => {
  const isAuthenticated = useTypesSelector(selectedIsAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Router;
