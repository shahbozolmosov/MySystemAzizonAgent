import React from 'react';

// Routes
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {selectedIsAuthenticated} from '../app/services/auth/authSlice';
import {useTypesSelector} from '../app/store';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';

export type RootStackParamList = {
  AppStack: undefined;
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
          <RootStack.Screen
            name="AppStack"
            component={AppStack}
            // options={{
            //   animationTypeForReplace: isAuthenticated ? 'pop' : 'push',
            // }}
          />
          <RootStack.Screen name="CustomerStack" component={CustomerStack} />
        </>
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

export default React.memo(RootNavigator);
