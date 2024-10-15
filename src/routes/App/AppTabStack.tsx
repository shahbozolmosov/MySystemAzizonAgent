import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import AppHeader from '../../components/common/AppHeader/AppHeader.tsx';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel.tsx';
import AnalyticsScreen from '../../screens/main/AnalyticsScreen';
import {TabBarLabelProps} from '../../types/types.ts';
import AppCustomerDayTabStack from './AppCustomerDayTabStack.tsx';
import SyncBtn from '../../components/common/SyncBtn/SyncBtn.tsx';

export type AppTabStackParamList = {
    // App customer
    AppCustomerDayTabStack: undefined;
    AppCustomerDay: {dayId: string};

    Analytics: undefined;
};

const Tab = createMaterialTopTabNavigator<AppTabStackParamList>();

const AppTabStack = () => {
    const tabBarLabel = useCallback(
        (props: TabBarLabelProps, tabRoute: {name: string}) => {
            let label = 'Asosiy';

            switch (tabRoute.name) {
                case 'Analytics':
                    label = 'Jami';
                    break;
            }

            return (
                <TabBarLabel
                    {...props}
                    color={'#007fff'}
                    label={label}
                    currentColor={true}
                />
            );
        },
        [],
    );
    return (
        <>
            <AppHeader />
            <Tab.Navigator
                initialRouteName="AppCustomerDayTabStack"
                screenOptions={({route: TabRoute}) => ({
                    tabBarStyle: {
                        elevation: 0,
                    },
                    tabBarLabel: props => tabBarLabel(props, TabRoute),
                    tabBarPressColor: 'transparent',
                })}>
                <Tab.Screen
                    name="AppCustomerDayTabStack"
                    component={AppCustomerDayTabStack}
                />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            </Tab.Navigator>
            <SyncBtn />
        </>
    );
};

export default React.memo(AppTabStack);
