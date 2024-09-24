import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../routes/RootNavigator';
import CustomerCard, {ICustomerCard} from './CustomerCard';

type CustomerCardListProps = {
  list: ICustomerCard[];
};

type CustomerCardListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppRootStack'
>;
const CustomerCardList = ({list}: CustomerCardListProps) => {
  const navigation = useNavigation<CustomerCardListNavigationProp>();

  const handleNavigate = useCallback(
    (customerId: string) => {
      navigation.push('CustomerStack', {customerId});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mijozlar</Text>
      <View style={styles.list}>
        {list.map(customer => (
          <CustomerCard
            onNavigate={handleNavigate}
            {...customer}
            key={customer.id}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
  },
  list: {},
});

export default CustomerCardList;
