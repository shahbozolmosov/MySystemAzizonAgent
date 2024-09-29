import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';

type HeaderTitleProps = {
  title: string | ReactNode;
};

const HeaderTitle = ({title}: HeaderTitleProps) => {
  return (
    <Text h4 h4Style={styles.title}>
      {title}
    </Text>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#22282b',
  },
});

export default React.memo(HeaderTitle);
