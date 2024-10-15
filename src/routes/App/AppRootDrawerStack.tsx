import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import AppRootDrawerContent from '../../components/common/AppRootDrawerContent/AppRootDrawerContent.tsx';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen'; 
import AppTabStack from './AppTabStack'; 
import AppOrderNativeStack from './Order/AppOrderNativeStack.tsx';

export type AppRootDrawerStackParamList = {
    AppTabStack: undefined;
    Profile: undefined;
    CreateCustomer: undefined;
    // Order
    AppOrderHistoryStack: undefined;
    AppOrderStack: undefined;
    AppOrderDetails: {orderId: string};
    AppOrderDraftDetails: {customerId: string; orderId: string};
    AppOrderDraftAddProduct: {customerId: string; orderId: string};

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
            initialRouteName="AppTabStack">
            <Drawer.Screen
                name="AppTabStack"
                component={AppTabStack}
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
            <Drawer.Screen
                name="CustomerReport"
                component={CustomerReportScreen}
            />
        </Drawer.Navigator>
    );
};

export default React.memo(AppRootDrawerStack);
