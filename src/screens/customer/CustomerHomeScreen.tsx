import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CustomerHomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>CustomerHome</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default React.memo(CustomerHomeScreen);
