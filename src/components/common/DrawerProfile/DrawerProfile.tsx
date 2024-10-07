import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ProfileImage from '../../../../assets/profile.png';
import {IUser} from '../../../app/services/user/user.ts';
import {getDBConnection} from '../../../database/sqlite.ts';
import {getUser} from '../../../database/user.ts';
import {AppDrawerStackParamList} from '../../../routes/App/AppRootStack.tsx';
import {useDispatch} from 'react-redux';
import {logout} from '../../../app/services/auth/authSlice.ts';

type DrawerProfileNavigationProp = NativeStackNavigationProp<
  AppDrawerStackParamList,
  'Profile'
>;

const DrawerProfile = () => {
  const navigation = useNavigation<DrawerProfileNavigationProp>();

  const [user, setUser] = useState<IUser | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        const userData = await getUser(db);
        if (!userData) {
          dispatch(logout());
        }
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    };

    initDB();
  }, [dispatch]);

  const handleNavigate = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <Image source={ProfileImage} style={styles.profileImage} />
      {user && (
        <View>
          <Text style={styles.name}>{`${user?.ism} ${user?.familya}`}</Text>
          <Text style={styles.login}>{user?.login}</Text>
        </View>
      )}
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
