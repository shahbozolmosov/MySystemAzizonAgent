import React, {useCallback} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type SearchInputProps = {
  inputRef: React.RefObject<TextInput>;
  onCancel: () => void;
};

const SearchInput = ({inputRef, onCancel}: SearchInputProps) => {
  // Handle clear
  const handleClear = useCallback(() => {
    inputRef?.current?.clear();
  }, [inputRef]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="search" size={22} />
        <TextInput
          style={styles.input}
          ref={inputRef}
          cursorColor={'#000000'}
          placeholder="Mahsulot qidirish..."
        />
        <Pressable style={styles.clearBtn} onPress={handleClear}>
          <Icon name="x" size={14} color={'#8f8f8f'} />
        </Pressable>
      </View>

      <TouchableOpacity onPress={handleCancel}>
        <Text style={styles.cancelText}>Orqaga</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 0,
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#eeeeef',
    paddingHorizontal: 45,
    paddingVertical: 4,
    borderRadius: 6,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  clearBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 20,
    height: 20,
    padding: 3,
    backgroundColor: '#E2E2E2',
    borderRadius: 24 / 2,
    zIndex: 1,
  },
  cancelText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#007fff',
  },
});

export default React.memo(SearchInput);
