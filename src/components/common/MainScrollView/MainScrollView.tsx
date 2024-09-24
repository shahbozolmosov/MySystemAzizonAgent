import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

type MainScrollViewProps = {
  children: React.ReactNode;
};
const MainScrollView = ({children}: MainScrollViewProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>{children}</View>
    </ScrollView>
  );
};

export default MainScrollView;

const styles = StyleSheet.create({
  container: {
    marginBottom: 68,
  },
  body: {
    paddingBottom: 40,
  },
});
