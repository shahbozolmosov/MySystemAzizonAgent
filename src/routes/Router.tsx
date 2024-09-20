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

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Router = () => {
  const isAuthenticated = useTypesSelector(selectedIsAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{
              animationTypeForReplace: isAuthenticated ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="CustomerStack" component={CustomerStack} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default React.memo(Router);
