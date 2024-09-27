import React from 'react';
import {StyleSheet, Text} from 'react-native';

type TabBarLabelProps = {
  label: string;
  focused: boolean;
  color: string;
};

const TabBarLabel = ({label, focused}: TabBarLabelProps) => {
  return (
    <Text style={focused ? styles.labelFocused : styles.label}>{label}</Text>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '300',
    color: '#1e232c',
  },
  labelFocused: {
    flex: 1,
    minWidth: 100,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e232c',
  },
});

export default React.memo(TabBarLabel);
