import React from 'react';
import {StyleSheet, Text} from 'react-native';

type SectionTitleProps = {
  title: string;
  paddingHorizontal?: number;
};

const SectionTitle = ({title, paddingHorizontal = 0}: SectionTitleProps) => {
  return <Text style={[styles.title, {paddingHorizontal}]}>{title}</Text>;
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
