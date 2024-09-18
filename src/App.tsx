import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Router from './routes/Router';
import {theme} from './themes/theme';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
