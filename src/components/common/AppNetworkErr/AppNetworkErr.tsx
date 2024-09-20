import React, {useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button, Image} from '@rneui/themed';
import NetworkErrImage from '../../../../assets/network-err.png';

interface IAppNetworkErrProps {
  onRefetch: () => void;
}

function AppNetworkErr({onRefetch}: IAppNetworkErrProps) {
  const handleRefetch = useCallback(() => {
    onRefetch();
  }, [onRefetch]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={NetworkErrImage} />
      <Text style={styles.title}>Internet bilan ulanishda xatolik</Text>
      <Text style={styles.desc}>
        Iltimos internetga ulanganingizni tekshiring yoki qayta urinib ko'ring
      </Text>
      <Button title={'Qayta urinish'} onPress={handleRefetch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081f43',
    paddingHorizontal: 36,
    paddingVertical: 61,
  },
  image: {
    width: 168,
    height: 287,
    marginBottom: 50,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '700',
    color: '#F3F3F3',
    marginBottom: 24,
  },
  desc: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    color: '#C8C8C8',
    marginBottom: 50,
  },
  btn: {
    borderColor: '#ffffff',
    color: '#ffff',
  },
});

export default React.memo(AppNetworkErr);
