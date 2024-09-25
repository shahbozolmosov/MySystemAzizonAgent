import {Button} from '@rneui/base';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type IconButtonProps = {
  icon: string;
  onPress?: () => void;
};

const IconButton = ({icon, onPress}: IconButtonProps) => {
  // Handle press
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <Button
      onPress={handlePress}
      title={<Icon name={icon} size={22} color="#22282b" />}
      type="clear"
      buttonStyle={styles.btn}
      containerStyle={styles.btnContainer}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    padding: 4,
  },
  btnContainer: {
    borderRadius: 40,
  },
});

export default React.memo(IconButton);
