import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ICustomer} from '../../../app/services/customer/customer';
import {CustomerTabStackParamList} from '../../../routes/CustomerStack';
import {RootStackParamList} from '../../../routes/RootNavigator';
import PhoneBtn from '../../ui/PhoneBtn/PhoneBtn';

type CustomerHeaderDrawerNavigationProp =
  DrawerNavigationProp<CustomerTabStackParamList>;

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerStack'
>;

type CustomerHeaderProps = {
  customer: ICustomer | null;
  isLoading: boolean;
};

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  customer,
  isLoading,
}) => {
  // Navigation
  const drawerNavigation = useNavigation<CustomerHeaderDrawerNavigationProp>();
  const navigation = useNavigation<RootStackNavigationProp>();

  // Customer
  const fullName = customer?.fio || '';
  const telefon = customer?.telefon || '';

  let firstName = '';
  let lastName = '';

  if (fullName && fullName.split(' ').length > 0) {
    firstName = fullName.split(' ')[0];
  }

  if (fullName && fullName.split(' ').length > 1) {
    lastName = fullName.split(' ')[1].charAt(0);
  }

  const toggleDrawer = useCallback(() => {
    drawerNavigation.dispatch(DrawerActions.openDrawer());
  }, [drawerNavigation]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={24} color="#22282b" />
      </TouchableOpacity>

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        {isLoading ? (
          'Yuklanmoqda...'
        ) : (
          <>
            {firstName}&nbsp;
            {lastName}.
          </>
        )}
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        {/* Call Button */}
        <PhoneBtn phoneNumber={telefon} />

        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon name="x" size={22} color="#22282b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    textAlign: 'center',
    color: '#22282b',
  },
  rightSideButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    marginRight: 15,
  },
});

export default memo(CustomerHeader);
