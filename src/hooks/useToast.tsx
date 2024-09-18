import React from 'react';
import {Animated, View, Text} from 'react-native';

const useToast = () => {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [fadeAnim] = React.useState(new Animated.Value(0));

  const showToast = React.useCallback(
    (message: string, duration: number = 3000) => {
      setMessage(message);
      setVisible(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, duration);
    },
    [fadeAnim],
  );

  const ToastComponent = visible ? (
    <View>
      <Text>{message}</Text>
    </View>
  ) : null;

  return {
    showToast,
    ToastComponent,
  };
};

export default useToast;
