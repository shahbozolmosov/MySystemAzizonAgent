import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export type DrawerItemBtnProps = {
  color: string;
  focused: boolean;
};

const DrawerItemBtn = (props: DrawerItemBtnProps) => {
  return (
    <View style={styles.btn}>
      <Icon name="user-plus" size={20} />
      <Text style={styles.btn}>Yangi mijoz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    gap: 12,
  },
  btnText: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    fontWeight: 400,
  },
});

export default React.memo(DrawerItemBtn);
