import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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

  const renderItem = useCallback(
    ({item}: {item: ICustomerCard}) => {
      return <CustomerCard {...item} onNavigate={handleNavigate} />;
    },
    [handleNavigate],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default React.memo(CustomerCardList);
