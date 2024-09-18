import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import Router from './routes/Router';
import {theme} from './themes/theme';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={'#ffffff'}
          animated
          showHideTransition={'slide'}
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
