import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../routes/RootNavigator';

type CustomerHomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerStack'
>;

const CustomerHomeScreen = ({}) => {
  const route = useRoute<CustomerHomeScreenRouteProp>();

  return (
    <SafeAreaView>
      <Text>CustomerHome {JSON.stringify(route.params)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHomeScreen);
