import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../routes/RootNavigator';
import IconButton from '../../ui/IconButton/IconButton';

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerStack'
>;

type CustomerHeaderOperationProps = {};

const CustomerHeaderOperation: React.FC<
  CustomerHeaderOperationProps
> = ({}) => {
  // Navigation
  const navigation = useNavigation<RootStackNavigationProp>();

  // Handle back
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack}>
        <Icon name="chevron-left" size={24} />
      </TouchableOpacity>

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        Buyurtmalar
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.rightSideButtons}>
        <IconButton icon="search" />
        <IconButton icon="filter" />

        {/* <TouchableOpacity onPress={() => {}}> */}
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
    gap: 0,
  },
  btn: {
    marginRight: 15,
  },
});

export default memo(CustomerHeaderOperation);
