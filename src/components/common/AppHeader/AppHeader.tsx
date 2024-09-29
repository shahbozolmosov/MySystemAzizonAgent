import {Text} from '@rneui/themed';
import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuBtn from '../../customer/MenuBtn/MenuBtn.tsx';

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <MenuBtn />

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        Asosiy
      </Text>

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
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    // borderBottomWidth: ,
  },
  title: {
    textAlign: 'center',
    color: '#22282b',
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
