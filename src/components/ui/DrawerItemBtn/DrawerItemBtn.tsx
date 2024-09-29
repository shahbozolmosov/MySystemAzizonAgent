import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type DrawerItemBtnProps = {
  label: string;
  icon: string;
};

const DrawerItemBtn = ({label, icon}: DrawerItemBtnProps) => {
  return (
    <Button
      type="clear"
      icon={<Icon style={styles.icon} name={icon} size={22} />}
      title={label}
      buttonStyle={styles.btnContainer}
      size="lg"
    />
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    color: '#4b4b4b',
    fontSize: 14,
  },
  icon: {
    marginRight: 14,
    color: '#4b4b4b',
  },
});

export default React.memo(DrawerItemBtn);
