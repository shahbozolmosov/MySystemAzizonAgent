import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CustomerTabStackParamList} from '../../../routes/customer/CustomerStack';

type CustomerHeaderDrawerNavigationProp =
  DrawerNavigationProp<CustomerTabStackParamList>;

const MenuBtn = () => {
  // Navigation
  const drawerNavigation = useNavigation<CustomerHeaderDrawerNavigationProp>();

  const toggleDrawer = useCallback(() => {
    drawerNavigation.dispatch(DrawerActions.openDrawer());
  }, [drawerNavigation]);

  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <Icon name="menu" size={24} color="#22282b" />
    </TouchableOpacity>
  );
};

export default MenuBtn;
