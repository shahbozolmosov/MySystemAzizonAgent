import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React, { Suspense } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './app/store';
import AuthProvider from './providers/AuthProvider';
import RootNavigator from './routes/RootNavigator';
import {theme} from './themes/theme';
import DatabaseProvider from './providers/DatabaseProvider.tsx';
import AppLoader from './components/common/AppLoader/AppLoader.tsx';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <DatabaseProvider>
            <ThemeProvider theme={theme}>
              <StatusBar
                backgroundColor={'#ffffff'}
                animated
                showHideTransition={'slide'}
                barStyle={'dark-content'}
              />
              <NavigationContainer>
                <Suspense fallback={<AppLoader />}>
                  <RootNavigator />
                </Suspense>
              </NavigationContainer>
              <Toast />
            </ThemeProvider>
          </DatabaseProvider>
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
