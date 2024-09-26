import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {logout} from '../../app/services/auth/authSlice';
import AppPageHeader from '../../components/common/AppPageHeader/AppPageHeader';
import Container from '../../components/common/Container/Container';
import {AppDrawerStackParamList} from '../../routes/App/AppRootStack';
import {useDispatch} from 'react-redux';

type ProfileScreenProps = DrawerScreenProps<AppDrawerStackParamList, 'Profile'>;

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const dispatch = useDispatch();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Container>
      <AppPageHeader onBack={handleBack} title="Profile" />

      {/* <View style={styles.profileCard}></View> */}

      <View style={styles.btnList}>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnBody}>
            <Icon name="user" size={24} color={'#1e232c'} />
            <Text style={styles.btnText}>Profilm</Text>
          </View>
          <Icon name="chevron-right" size={24} color={'#1e232c'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnBody}>
            <Icon name="settings" size={24} color={'#1e232c'} />
            <Text style={styles.btnText}>Sozlamalar</Text>
          </View>
          <Icon name="chevron-right" size={24} color={'#1e232c'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <View style={styles.btnBody}>
            <Icon name="log-out" size={24} color={'#1e232c'} />
            <Text style={styles.btnText}>Chiqish</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileCard: {},
  btnList: {},
  btn: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    padding: 10,
  },
  btnBody: {
    flexDirection: 'row',
    gap: 10,
  },
  btnText: {
    marginLeft: 14,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#1e232c',
  },
});

export default React.memo(ProfileScreen);
