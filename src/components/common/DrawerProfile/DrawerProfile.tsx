import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image} from '@rneui/themed';
import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ProfileImage from '../../../../assets/profile.png';
import {selectedUser} from '../../../app/services/auth/authSlice';
import {useTypesSelector} from '../../../app/store';
import {AppDrawerStackParamList} from '../../../routes/App/AppRootStack.tsx';

type DrawerProfileNavigationProp = NativeStackNavigationProp<
  AppDrawerStackParamList,
  'Profile'
>;

const DrawerProfile = () => {
  const navigation = useNavigation<DrawerProfileNavigationProp>();

  const user = useTypesSelector(selectedUser);

  const handleNavigate = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <Image source={ProfileImage} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{`${user?.ism} ${user?.familya}`}</Text>
        <Text style={styles.login}>{user?.login}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
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
