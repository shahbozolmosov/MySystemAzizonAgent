import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  paddingHorizontal?: number;
};

export default function Container({
  children,
  paddingHorizontal = 14,
}: ContainerProps) {
  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
