import React from 'react';

// Routes
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectedIsAuthenticated } from '../app/services/auth/authSlice';
import { useTypesSelector } from '../app/store';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';
import AppRootStack from './App/AppRootStack';

export type RootStackParamList = {
  AppRootStack: undefined;
  CustomerStack: undefined;
  AuthStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useTypesSelector(selectedIsAuthenticated);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen name="AppRootStack" component={AppRootStack} />
          <RootStack.Screen name="CustomerStack" component={CustomerStack} />
        </>
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

export default React.memo(RootNavigator);
