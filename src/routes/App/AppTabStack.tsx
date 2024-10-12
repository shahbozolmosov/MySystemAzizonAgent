import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import AnalyticsScreen from '../../screens/main/AnalyticsScreen';
import HomeScreen from '../../screens/main/HomeScreen';
import AppHeader from '../../components/common/AppHeader/AppHeader.tsx';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel.tsx';
import {TabBarLabelProps} from '../../types/types.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

export type AppTabStackParamList = {
    Home: undefined;
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
                initialRouteName="Home"
                screenOptions={({route: TabRoute}) => ({
                    tabBarStyle: {
                        elevation: 0,
                    },
                    tabBarLabel: props => tabBarLabel(props, TabRoute),
                    tabBarIndicatorStyle: {
                        // height: 4,
                        // backgroundColor: '#1e232c',
                        borderRadius: 16,
                    },
                    tabBarPressColor: 'transparent',
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            </Tab.Navigator>
        </>
    );
};

export default React.memo(AppTabStack);
