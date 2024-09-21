import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from '@rneui/themed';
import PhoneBtn from '../../ui/PhoneBtn/PhoneBtn';

interface CustomerHeaderProps {
  title: string;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => {}}>
        <Icon name="menu" size={24} color="#22282b" />
      </TouchableOpacity>

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        {title}
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        {/* Call Button */}
        <PhoneBtn phoneNumber="+998997470473" />

        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={22} color="#22282b" />
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
    marginRight: 15,
  },
});

export default memo(CustomerHeader);
