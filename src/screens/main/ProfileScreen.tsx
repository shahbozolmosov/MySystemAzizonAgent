import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import AppPageHeader from '../../components/common/AppPageHeader/AppPageHeader';
import Container from '../../components/common/Container/Container';
import {AppDrawerStackParamList} from '../../routes/App/AppRootStack';

type ProfileScreenProps = DrawerScreenProps<AppDrawerStackParamList, 'Profile'>;

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <AppPageHeader onBack={handleBack} />

      <Text>ProfileScreen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default React.memo(ProfileScreen);
