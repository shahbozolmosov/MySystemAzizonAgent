import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type OrderDraftProductAddCardProps = {
  onPress: () => void;
};

const OrderDraftProductAddCard = ({onPress}: OrderDraftProductAddCardProps) => {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon style={styles.icon} name="plus" size={24} />
      <Text style={styles.text}>Mahsulot qo'shish</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  icon: {
    marginRight: 14,
    color: '#8391A1',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#8391A1',
  },
});

export default React.memo(OrderDraftProductAddCard);
