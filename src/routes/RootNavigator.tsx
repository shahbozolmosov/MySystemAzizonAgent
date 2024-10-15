import React from 'react';

// Routes
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {selectedIsAuthenticated} from '../app/services/auth/authSlice';
import {selectedStarterIsSync} from '../app/services/starter/starterSlice.ts';
import {useTypesSelector} from '../app/store';
import StarterScreen from '../screens/starter/StarterScreen.tsx';
import AppRootDrawerStack from './App/AppRootDrawerStack.tsx';
import AuthStack from './AuthStack';
import CustomerStack from './customer/CustomerStack';

export type RootStackParamList = {
    Starter: undefined;
    AppRootStack: undefined;
    CustomerStack: {
        customerId: string;
    };
    AuthStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const isAuthenticated = useTypesSelector(selectedIsAuthenticated);
    const isSync = useTypesSelector(selectedStarterIsSync);

    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {isAuthenticated && !isSync ? (
                <RootStack.Screen name="Starter" component={StarterScreen} />
            ) : isAuthenticated ? (
                <>
                    <RootStack.Screen
                        name="AppRootStack"
                        component={AppRootDrawerStack}
                    />
                    <RootStack.Screen
                        name="CustomerStack"
                        component={CustomerStack}
                    />
                </>
            ) : (
                <RootStack.Screen name="AuthStack" component={AuthStack} />
            )}
        </RootStack.Navigator>
    );
};

export default React.memo(RootNavigator);
