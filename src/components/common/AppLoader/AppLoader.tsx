import {Image} from '@rneui/themed';
import React, {useEffect, useRef} from 'react';
// Brand
import Logo from '../../../../assets/logo192.png';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import Container from '../Container/Container';

const AppLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000, // 2 seconds per rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    rotateAnimation.start();

    return () => rotateAnimation.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.body}>
          <View style={styles.loaderWrapper}>
            <Animated.View style={[styles.loader, {transform: [{rotate}]}]} />
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute', // Make loader appear behind the logo
    height: 160, // Circle size
    width: 160, // Circle size
    borderRadius: 70, // Circle radius (half of height/width)
    borderWidth: 3, // Border width for the loader
    borderColor: '#ccc',
    borderTopColor: '#3498db', // Top color for the rotating effect
  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 24,
  },
});

export default React.memo(AppLoader);
