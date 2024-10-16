import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppCustomerDayTabStack from './Customer/AppCustomerDayTabStack';
import AppTabStack from './AppTabStack';
import AppCustomerDayAddScreen from '../../screens/main/customer/AppCustomerDayAddScreen';

export type AppNativeStackParamList = {
    AppTabStack: undefined;
    AppCustomerDayTabStack: undefined;
    AppCustomerDay: {dayId: string};
    AppCustomerDayAdd: {dayId: string};

    Analytics: undefined;
};

const NativeStack = createNativeStackNavigator<AppNativeStackParamList>();

const AppNativeStack = () => {
    return (
        <NativeStack.Navigator
            initialRouteName="AppTabStack"
            screenOptions={{headerShown: false}}>
            <NativeStack.Screen name="AppTabStack" component={AppTabStack} />
            <NativeStack.Screen
                name="AppCustomerDayTabStack"
                component={AppCustomerDayTabStack}
            />
            <NativeStack.Screen
                name="AppCustomerDayAdd"
                component={AppCustomerDayAddScreen}
            />
        </NativeStack.Navigator>
    );
};

export default React.memo(AppNativeStack);
