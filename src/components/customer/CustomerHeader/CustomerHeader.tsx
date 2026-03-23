import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../routes/RootNavigator';
import PhoneBtn from '../../ui/PhoneBtn/PhoneBtn';
import MenuBtn from '../MenuBtn/MenuBtn';
import HeaderTitle from '../../ui/HeaderTitle/HeaderTitle.tsx';
import {getDBConnection} from '../../../database/sqlite.ts';
import {getCustomerById} from '../../../database/customers.ts';
import {ICustomer} from '../../../app/services/customer/customer.ts';

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerStack'
>;

type CustomerHeaderProps = {
  customerId: string;
};

const CustomerHeader: React.FC<CustomerHeaderProps> = ({customerId}) => {
  // Navigation
  const navigation = useNavigation<RootStackNavigationProp>();

  // State
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);

  if (!customerId) {
    throw new Error('customerId is required');
  }

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        const allCustomer = await getCustomerById(db, customerId);
        if (allCustomer) {
          setCustomerData(allCustomer);
        }
      } catch (err) {
        console.error('Failed to initialize database', err);
      }
    };

    initDB();
  }, [customerId]);

  // Customer
  const fullName = customerData?.fio || '';
  const telefon = customerData?.telefon || '';

  let firstName = '';
  let lastName = '';

  if (fullName && fullName.split(' ').length > 0) {
    firstName = fullName.split(' ')[0];
  }

  if (fullName && fullName.split(' ').length > 1) {
    lastName = fullName.split(' ')[1].charAt(0);
  }

  // Navigation
  const handleNavigate = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <MenuBtn />

      {/* Header Title */}
      <HeaderTitle
        title={
          <>
            {firstName}&nbsp;
            {lastName}.
          </>
        }
      />

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        {/* Call Button */}
        <PhoneBtn phoneNumber={telefon} />

        {/* Profile Button */}
        <TouchableOpacity onPress={handleNavigate}>
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
    paddingVertical: 10,
    paddingHorizontal: 14,
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
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    marginRight: 15,
  },
});

export default memo(CustomerHeader);
