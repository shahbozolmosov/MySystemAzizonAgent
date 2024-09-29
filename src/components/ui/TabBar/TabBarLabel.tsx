import React from 'react';
import {StyleSheet, Text} from 'react-native';

type TabBarLabelProps = {
  label: string;
  focused: boolean;
  color: string;
  currentColor?: boolean;
};

const TabBarLabel = ({
  label,
  focused,
  color,
  currentColor,
}: TabBarLabelProps) => {
  return (
    <Text
      style={
        (focused ? styles.labelFocused : styles.label,
        currentColor && focused ? {color} : styles.color)
      }>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '300',
  },
  labelFocused: {
    flex: 1,
    minWidth: 100,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: 'bold',
  },
  color: {
    color: '#1e232c',
  },
});

export default React.memo(TabBarLabel);
