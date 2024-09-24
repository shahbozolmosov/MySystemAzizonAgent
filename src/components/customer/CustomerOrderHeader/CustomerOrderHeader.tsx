import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Badge, Text} from '@rneui/themed';
import React, {memo} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../routes/RootNavigator';
import MenuBtn from '../MenuBtn/MenuBtn';

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerStack'
>;

type CustomerOrderHeaderProps = {};

const CustomerOrderHeader: React.FC<CustomerOrderHeaderProps> = ({}) => {
  // Navigation
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <MenuBtn />

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        Yangi buyurtma
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Basket')}>
          <View style={styles.badge}>
            <Badge
              badgeStyle={styles.badgeBody}
              textStyle={styles.badgeText}
              value="20"
            />
          </View>
          <Icon name="shopping-bag" size={22} color="#22282b" />
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
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    position: 'relative',
    zIndex: 0,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    zIndex: 1,
  },
  badgeBody: {
    backgroundColor: '#0385FF',
  },
  badgeText: {
    color: '#ffffff',
  },
});

export default memo(CustomerOrderHeader);
