import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../routes/RootNavigator';

type AppHeaderNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppRootStack'
>;

type AppHeaderProps = {
  drawerNavigation: DrawerNavigationProp<ParamListBase, string, undefined>;
};

const CustomerHeader: React.FC<AppHeaderProps> = ({drawerNavigation}) => {
  const navigation = useNavigation<AppHeaderNavigationProp>();

  const toggleDrawer = useCallback(() => {
    drawerNavigation.toggleDrawer();
  }, [drawerNavigation]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={24} color="#22282b" />
      </TouchableOpacity>

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        Asosiy
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.popToTop()}>
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
    padding: 15,
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

export default memo(CustomerHeader);
