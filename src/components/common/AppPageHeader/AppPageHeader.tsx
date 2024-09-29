import {Text} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type AppPageHeaderProps = {
  onBack: () => void;
  title: string;
};

const AppPageHeader = ({onBack, title}: AppPageHeaderProps) => {
  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleBack}>
        <Icon name="chevron-left" size={24} color={'#1e232c'} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    marginHorizontal: -10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    justifyContent: 'space-between',
  },
  btn: {},
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default React.memo(AppPageHeader);
