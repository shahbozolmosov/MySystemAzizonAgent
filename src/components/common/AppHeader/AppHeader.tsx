import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuBtn from '../../customer/MenuBtn/MenuBtn.tsx';
import HeaderTitle from '../../ui/HeaderTitle/HeaderTitle.tsx';

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <MenuBtn />

      {/* Header Title */}
      <HeaderTitle title={'Asosiy'} />

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="sliders" size={22} color="#22282b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    // borderBottomWidth: ,
  },
  rightSideButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    marginRight: 15,
  },
});

export default memo(AppHeader);
