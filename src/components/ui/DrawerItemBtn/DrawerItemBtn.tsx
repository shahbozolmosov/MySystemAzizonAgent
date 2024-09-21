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
      touchSoundDisabled={false}
    />
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
  },
  icon: {
    marginRight: 18,
    color: '#7e919a',
  },
});

export default React.memo(DrawerItemBtn);
