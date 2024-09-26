import {BaseQueryApi} from '@reduxjs/toolkit/query';
import Toast from 'react-native-toast-message';
import {logout} from '../app/services/auth/authSlice';

export const authCheckApiResponse = <T>(
  response: {data?: T},
  api: BaseQueryApi,
) => {
  if (response.data) {
    if (typeof response.data === 'object' && 'error_code' in response.data) {
      const data = response.data;

      if (data.error_code === 401) {
        Toast.show({
          type: 'info',
          text1: 'Qaytadan kiring!',
          text2: 'Bu login parol yordamida boshqa sessiya aniqlandi',
        });
        api.dispatch(logout());
      }
    }
  }
};
