import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomerHeader from '../../components/common/CustomerHeader/CustomerHeader';

const CustomerHome = () => {
  return (
    <SafeAreaView>
      <CustomerHeader title="Shahboz" />

      <Text>CustomerHome</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHome);
