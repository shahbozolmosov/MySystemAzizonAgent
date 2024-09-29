import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import DrawerProfile from '../../components/common/DrawerProfile/DrawerProfile';
import DrawerItemBtn from '../../components/ui/DrawerItemBtn/DrawerItemBtn';
import AppTabStack from './AppTabStack';
import AllOrderHistoryScreen from '../../screens/main/AllOrderHistoryScreen';
import CustomerReportScreen from '../../screens/customer/CustomerReportScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import CustomerAddScreen from '../../screens/customer/CustomerAddScreen.tsx';
import {DrawerContentComponentProps} from '@react-navigation/drawer/src/types.tsx';
import {Alert} from 'react-native';

export type AppDrawerStackParamList = {
  AppTabStack: undefined;
  Profile: undefined;
  CreateCustomer: undefined;
  AllOrderHistory: undefined;
  CustomerReport: undefined;
  CustomerAdd: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerStackParamList>();

function CustomDrawerContent({navigation}: DrawerContentComponentProps) {
  return (
    <>
      <DrawerProfile />
      <DrawerItemBtn label="Yangi mijoz" icon="user" />
      <DrawerItemBtn label="Buyurtmalar" icon="inbox" />
      <DrawerItemBtn label="Mijozlar hisoboti" icon="users" />
      <DrawerItemBtn
        label="Sozlamalar"
        icon="settings"
        onPress={() => Alert.alert('Salom')}
      />
    </>
  );
}

const AppRootStack = () => {
  const drawerContent = useCallback(
    (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />,
    [],
  );

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
