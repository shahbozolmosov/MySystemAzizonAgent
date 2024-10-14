import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import AppOrderHistoryDraftDetailsScreen from '../../screens/main/order/AppOrderHistoryDraftDetailsScreen';
import AppOrderHistoryStackScreen from './AppOrderHistoryStackScreen';
import {AppDrawerStackParamList} from './AppRootStack';
import AppOrderHistoryDraftAddProductScreen from '../../screens/main/order/AppOrderHistoryDraftAddProductScreen';
import AppOrderDetailsScreen from '../../screens/main/order/AppOrderDetailsScreen';

type AppOrderStackScreenProps = NativeStackScreenProps<
    AppDrawerStackParamList,
    'AppOrderStack'
>;

const CustomerOrderStack =
    createNativeStackNavigator<AppDrawerStackParamList>();

const AppOrderStackScreen = ({}: AppOrderStackScreenProps) => {
    return (
        <CustomerOrderStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="AppOrderHistoryStack">
            <CustomerOrderStack.Screen
                name="AppOrderHistoryStack"
                component={AppOrderHistoryStackScreen}
            />
            <CustomerOrderStack.Screen
                name="AppOrderDetails"
                component={AppOrderDetailsScreen}
            />
            <CustomerOrderStack.Screen
                name="AppOrderDraftDetails"
                component={AppOrderHistoryDraftDetailsScreen}
            />
            <CustomerOrderStack.Screen
                name="AppOrderDraftAddProduct"
                component={AppOrderHistoryDraftAddProductScreen}
            />
        </CustomerOrderStack.Navigator>
    );
};

export default AppOrderStackScreen;
