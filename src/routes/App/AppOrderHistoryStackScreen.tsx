import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../components/ui/IconButton/IconButton';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel';
import AppOrderHistoryDelivered from '../../screens/main/order/AppOrderHistoryDelivered';
import AppOrderHistoryDraft from '../../screens/main/order/AppOrderHistoryDraft';
import AppOrderHistoryProcess from '../../screens/main/order/AppOrderHistoryProcess';
import {TabBarLabelProps} from '../../types/types';

export type AppOrderHistoryStackRootList = {
    Process: undefined;
    Delivered: undefined;
    OrderDraft: undefined;
};

const Tab = createMaterialTopTabNavigator<AppOrderHistoryStackRootList>();

const AppOrderHistoryStackScreen = () => {
    const tabBarLabel = useCallback(
        (props: TabBarLabelProps, tabRoute: {name: string}) => {
            let label = 'Jarayonda';

            switch (tabRoute.name) {
                case 'Delivered':
                    label = 'Yetkazildi';
                    break;
                case 'OrderDraft':
                    label = 'Qoralamalar';
                    break;
            }

            return <TabBarLabel {...props} label={label} />;
        },
        [],
    );
    return (
        <>
            <CustomerHeaderOperation
                title="Umumiy buyurtmalar"
                customElements={
                    <>
                        <IconButton icon="filter" />
                    </>
                }
                borderShown={false}
            />
            <Tab.Navigator
                initialRouteName="Process"
                screenOptions={({route: TabRoute}) => ({
                    tabBarStyle: {
                        elevation: 0,
                    },
                    tabBarLabel: props => tabBarLabel(props, TabRoute),
                    tabBarIndicatorStyle: {
                        height: 4,
                        backgroundColor: '#1e232c',
                        borderRadius: 16,
                    },
                    tabBarPressColor: 'transparent',
                    tabBarScrollEnabled: true,
                })}>
                <Tab.Screen name="Process" component={AppOrderHistoryProcess} />
                <Tab.Screen
                    name="Delivered"
                    component={AppOrderHistoryDelivered}
                />
                <Tab.Screen
                    name="OrderDraft"
                    component={AppOrderHistoryDraft}
                />
            </Tab.Navigator>
        </>
    );
};

export default AppOrderHistoryStackScreen;
