import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTypesSelector} from '../../../app/store';
import {selectedUser} from '../../../app/services/auth/authSlice';
import ProfileImage from '../../../../assets/profile.png';
import {Image} from '@rneui/themed';

const DrawerProfile = () => {
  const user = useTypesSelector(selectedUser);

  return (
    <View style={styles.container}>
      <Image source={ProfileImage} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{`${user?.ism} ${user?.familya}`}</Text>
        <Text style={styles.login}>{user?.login}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    gap: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  login: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#7e919a',
  },
});

export default React.memo(DrawerProfile);
