import {PermissionsAndroid, Platform} from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Joylashuvga ro'xsat berish talab qilinadi",
          message: 'Bu ilova sizning joylashuvingizga kirishi kerak',
          buttonNeutral: 'Keyinroq',
          buttonNegative: 'Bekor qilish',
          buttonPositive: 'Ha',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission error', err);
      return false;
    }
  } else {
    return true; // iOS permissions handled via Info.plist
  }
};
