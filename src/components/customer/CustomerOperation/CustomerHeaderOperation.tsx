import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../routes/RootNavigator';
import IconButton from '../../ui/IconButton/IconButton';
import SearchInput from '../../ui/SearchInput/SearchInput';

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerStack'
>;

type CustomerHeaderOperationProps = {
  customElements?: React.ReactNode;
  title: string;
  showSearch?: boolean;
  setSearchVal?: (value: string) => void;
};

const CustomerHeaderOperation: React.FC<CustomerHeaderOperationProps> = ({
  customElements,
  title,
  showSearch,
  setSearchVal,
}) => {
  // Navigation
  const navigation = useNavigation<RootStackNavigationProp>();

  // Ref
  const searchRef = useRef<TextInput>(null);

  // State
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Handle back
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle show search input
  const handleShowSearchInput = useCallback(() => {
    setShowSearchInput(prev => !prev);
  }, []);

  useEffect(() => {
    if (showSearchInput && searchRef.current) {
      searchRef.current?.focus();
    }
  }, [showSearchInput]);

  // Handle change
  const handleChange = useCallback(
    (val: string) => {
      if (setSearchVal) {
        setSearchVal(val);
      }
    },
    [setSearchVal],
  );

  return showSearchInput ? (
    <View style={styles.container}>
      <SearchInput
        inputRef={searchRef}
        setValue={handleChange}
        onCancel={handleShowSearchInput}
      />
    </View>
  ) : (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack}>
        <Icon name="chevron-left" size={24} color={'#22282b'} />
      </TouchableOpacity>

      {/* Header Title */}
      <Text h4 h4Style={styles.title}>
        {title}
      </Text>

      {/* Right Side Buttons */}
      <View style={styles.customElements}>
        {showSearch && (
          <IconButton icon="search" onPress={handleShowSearchInput} />
        )}
        {customElements}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    textAlign: 'center',
    color: '#22282b',
  },
  customElements: {
    flexDirection: 'row',
    gap: 0,
  },
  searchContainer: {
    flex: 1,
  },
});

export default memo(CustomerHeaderOperation);
