import React, {useState} from 'react';

// Routes
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [isAuthenticated] = useState(false);

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
