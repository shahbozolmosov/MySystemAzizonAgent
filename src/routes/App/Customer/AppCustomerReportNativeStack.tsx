import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppCustomerReportScreen from '../../../screens/main/customer/AppCustomerReportScreen';
import AppCustomerSelectScreen from '../../../screens/main/customerReport/AppCustomerSelectScreen';

export type AppCustomerReportNativeStackParamList = {
    AppCustomerSelect: undefined;
    AppCustomerReport: {customerId: string};
};

const NativeStack =
    createNativeStackNavigator<AppCustomerReportNativeStackParamList>();

const AppCustomerReportNativeStack = () => {
    return (
        <NativeStack.Navigator
            initialRouteName="AppCustomerSelect"
            screenOptions={{headerShown: false}}>
            <NativeStack.Screen
                name="AppCustomerSelect"
                component={AppCustomerSelectScreen}
            />
            <NativeStack.Screen
                name="AppCustomerReport"
                component={AppCustomerReportScreen}
            />
        </NativeStack.Navigator>
    );
};

export default React.memo(AppCustomerReportNativeStack);
