import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import AppOrderHistoryDraftDetailsScreen from '../../../screens/main/order/AppOrderHistoryDraftDetailsScreen';
import AppOrderHistoryDraftAddProductScreen from '../../../screens/main/order/AppOrderHistoryDraftAddProductScreen';
import AppOrderDetailsScreen from '../../../screens/main/order/AppOrderDetailsScreen';
import {AppRootDrawerStackParamList} from '../AppRootDrawerStack';
import AppOrderHistoryStack from './AppOrderHistoryStack';

type AppOrderNativeStackProps = NativeStackScreenProps<
    AppRootDrawerStackParamList,
    'AppOrderStack'
>;

const NativeStack = createNativeStackNavigator<AppRootDrawerStackParamList>();

const AppOrderNativeStack = ({}: AppOrderNativeStackProps) => {
    return (
        <NativeStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="AppOrderHistoryStack">
            <NativeStack.Screen
                name="AppOrderHistoryStack"
                component={AppOrderHistoryStack}
            />
            <NativeStack.Screen
                name="AppOrderDetails"
                component={AppOrderDetailsScreen}
            />
            <NativeStack.Screen
                name="AppOrderDraftDetails"
                component={AppOrderHistoryDraftDetailsScreen}
            />
            <NativeStack.Screen
                name="AppOrderDraftAddProduct"
                component={AppOrderHistoryDraftAddProductScreen}
            />
        </NativeStack.Navigator>
    );
};

export default AppOrderNativeStack;
