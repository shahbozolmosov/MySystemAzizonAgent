import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import AppRootDrawerContent from '../../components/common/AppRootDrawerContent/AppRootDrawerContent.tsx';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';
// import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import AppNativeStack from './AppNativeStack.tsx';
import AppOrderNativeStack from './Order/AppOrderNativeStack.tsx';

export type AppRootDrawerStackParamList = {
    // Stack
    AppNativeStack: undefined;
    AppOrderHistoryStack: undefined;
    AppOrderStack: undefined;

    Profile: undefined;
    CreateCustomer: undefined;

    // Order
    AppOrderDetails: {orderId: string};
    AppOrderDraftDetails: {customerId: string; orderId: string};
    AppOrderDraftAddProduct: {customerId: string; orderId: string};

    // Customer
    CustomerReport: undefined;
    CustomerAdd: undefined;
};

const Drawer = createDrawerNavigator<AppRootDrawerStackParamList>();

const AppRootDrawerStack = () => {
    const drawerContent = useCallback(() => <AppRootDrawerContent />, []);

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={drawerContent}
            initialRouteName="AppNativeStack">
            <Drawer.Screen
                name="AppNativeStack"
                component={AppNativeStack}
                options={{
                    drawerItemStyle: {
                        display: 'none',
                    },
                    swipeEnabled: true,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen name={'CustomerAdd'} component={CustomerAddScreen} />
            <Drawer.Screen
                name="AppOrderStack"
                component={AppOrderNativeStack}
            />
            {/* <Drawer.Screen
                name="CustomerReport"
                component={CustomerReportScreen}
            /> */}
        </Drawer.Navigator>
    );
};

export default React.memo(AppRootDrawerStack);
