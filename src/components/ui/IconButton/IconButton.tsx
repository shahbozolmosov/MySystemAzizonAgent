import {Button} from '@rneui/base';
import {Badge} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  badgeShown?: boolean;
  badgeAmount?: number;
};

const IconButton = ({
  icon,
  onPress,
  badgeShown,
  badgeAmount,
}: IconButtonProps) => {
  // Handle press
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <View style={styles.content}>
      {badgeShown && (
        <View style={styles.badge}>
          <Badge
            containerStyle={styles.badgeContainer}
            badgeStyle={styles.badgeBody}
            textStyle={styles.badgeText}
            value={badgeAmount}
          />
        </View>
      )}

      <Button
        onPress={handlePress}
        title={<Icon name={icon} size={22} color="#22282b" />}
        type="clear"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 0,
  },
  btn: {
    width: 40,
    height: 40,
    padding: 4,
  },
  btnContainer: {
    borderRadius: 40,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    zIndex: 1,
  },
  badgeContainer: {
    minWidth: 20,
    minHeight: 20,
  },
  badgeBody: {
    backgroundColor: '#0385FF',
  },
  badgeText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#ffffff',
  },
});

export default React.memo(IconButton);
