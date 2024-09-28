import Toast from 'react-native-toast-message';
import {requestLocationPermission} from './permission/requestLocationPermission';
import Geolocation from 'react-native-geolocation-service';

interface Location {
  latitude: number;
  longitude: number;
}

export const getLocation = async (): Promise<Location | null> => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    return null;
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        console.error('Location error', error);
        Toast.show({
          type: 'error',
          text1: 'Sizning lokatsiya manzilingiz olinmadi.',
          text2: "Qaytadan urinib ko'ring yoki biz bilan bog'laning",
        });
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // 30s
        maximumAge: 10000,
      },
    );
  });
};
