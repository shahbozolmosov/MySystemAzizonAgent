import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react'; 
import AppCustomerDayScreen from '../../../screens/main/customer/AppCustomerDayScreen';
import { AppTabStackParamList } from '../AppTabStack';

const Tab = createMaterialTopTabNavigator<AppTabStackParamList>();

interface TabItem {
    label: string;
    dayId: string; // Har bir tab uchun o‘ziga xos dayId
}

const tabItems: TabItem[] = [
    {label: 'Du', dayId: '1'},
    {label: 'Se', dayId: '2'},
    {label: 'Cho', dayId: '3'},
    {label: 'Pay', dayId: '4'},
    {label: 'Ju', dayId: '5'},
    {label: 'Sha', dayId: '6'},
    {label: 'Ya', dayId: '7'},
];

const AppCustomerDayTabStack: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: false,
                tabBarItemStyle: {
                    padding: 0,
                    // height: 30
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#1e232c',
                    height: 4,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                },
                tabBarLabelStyle: {
                    padding: 0,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: '400',
                    fontSize: 12,
                    textTransform: 'none',
                },
                tabBarStyle: {
                    elevation: 40,
                    shadowColor: 'rgba(153, 161, 169, 0.8)',
                    shadowOffset: {
                        width: 40,
                        height: 40,
                    },
                    shadowRadius: 10,
                    backgroundColor: '#ffff',
                },
                tabBarPressColor: 'transparent',
            }}>
            {tabItems.map(item => (
                <Tab.Screen
                    name={`AppCustomerDay_${item.dayId}`}
                    component={AppCustomerDayScreen}
                    key={item.dayId}
                    options={{
                        tabBarLabel: item.label,
                    }}
                    initialParams={{dayId: item.dayId}}
                />
            ))}
        </Tab.Navigator>
    );
};

export default React.memo(AppCustomerDayTabStack);
