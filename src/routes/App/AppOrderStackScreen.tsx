import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import AppOrderDraftDetailsScreen from '../../screens/main/order/AppOrderDraftDetailsScreen';
import AppOrderHistoryStackScreen from './AppOrderHistoryStackScreen';
import {AppDrawerStackParamList} from './AppRootStack';

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
                name="AppOrderDraftDetails"
                component={AppOrderDraftDetailsScreen}
            />
        </CustomerOrderStack.Navigator>
    );
};

export default AppOrderStackScreen;
