import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import AppHeader from '../../components/common/AppHeader/AppHeader';
import DrawerProfile from '../../components/common/DrawerProfile/DrawerProfile';
import DrawerItemBtn from '../../components/ui/DrawerItemBtn/DrawerItemBtn';
import AppTabStack from './AppTabStack';
import AllOrderHistoryScreen from '../../screens/main/AllOrderHistoryScreen';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';

export type AppDrawerStackParamList = {
  AppTabStack: undefined;
  Profile: undefined;
  CreateCustomer: undefined;
  AllOrderHistory: undefined;
  CustomerReport: undefined;
  CustomerAdd: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerStackParamList>();

function CustomDrawerContent() {
  return (
    <>
      <DrawerProfile />
      <DrawerItemBtn label="Yangi mijoz" icon="user" />
      <DrawerItemBtn label="Buyurtmalar" icon="inbox" />
      <DrawerItemBtn label="Mijozlar hisoboti" icon="users" />
      <DrawerItemBtn label="Sozlamalar" icon="settings" />
    </>
  );
}

const AppRootStack = () => {
  const myHeader = useCallback(({navigation}: DrawerHeaderProps) => {
    return <AppHeader drawerNavigation={navigation} />;
  }, []);

  const drawerContent = useCallback(() => <CustomDrawerContent />, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        header: myHeader,
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
