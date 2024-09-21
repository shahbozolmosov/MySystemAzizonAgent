import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './app/store';
import Router from './routes/Router';
import {theme} from './themes/theme';
import AuthProvider from './providers/AuthProvider';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
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
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
