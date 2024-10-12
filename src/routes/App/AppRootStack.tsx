import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import AppRootDrawerContent from '../../components/common/AppRootDrawerContent/AppRootDrawerContent.tsx';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import AppOrderHistoryStackScreen from './AppOrderHistoryStackScreen.tsx';
import AppTabStack from './AppTabStack';

export type AppDrawerStackParamList = {
    AppTabStack: undefined;
    Profile: undefined;
    CreateCustomer: undefined;
    // Order
    AppOrderHistoryStack: undefined;
    AppOrderDetails: {orderId: string};

    CustomerReport: undefined;
    CustomerAdd: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerStackParamList>();

const AppRootStack = () => {
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
                name="AppOrderHistoryStack"
                component={AppOrderHistoryStackScreen}
            />
            <Drawer.Screen
                name="CustomerReport"
                component={CustomerReportScreen}
            />
        </Drawer.Navigator>
    );
};

export default React.memo(AppRootStack);
