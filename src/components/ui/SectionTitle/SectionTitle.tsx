import React from 'react';
import {StyleSheet, Text} from 'react-native';

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({title}: SectionTitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Back',
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
    lineHeight: 40,
  },
});

export default React.memo(SectionTitle);
