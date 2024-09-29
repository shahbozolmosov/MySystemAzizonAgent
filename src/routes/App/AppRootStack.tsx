import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import AppTabStack from './AppTabStack';
import AllOrderHistoryScreen from '../../screens/main/AllOrderHistoryScreen';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';
import AppRootDrawerContent from '../../components/common/AppRootDrawerContent/AppRootDrawerContent.tsx';

export type AppDrawerStackParamList = {
  AppTabStack: undefined;
  Profile: undefined;
  CreateCustomer: undefined;
  AllOrderHistory: undefined;
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
      <Drawer.Screen name="AllOrderHistory" component={AllOrderHistoryScreen} />
      <Drawer.Screen name="CustomerReport" component={CustomerReportScreen} />
    </Drawer.Navigator>
  );
};

export default React.memo(AppRootStack);
