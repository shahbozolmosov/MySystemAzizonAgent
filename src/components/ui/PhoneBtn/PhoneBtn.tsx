import React, {memo} from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PhoneBtn = ({phoneNumber}: {phoneNumber: string}) => {
  const makePhoneCall = () => {
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url);

    // Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (supported) {
    //       return Linking.openURL(url);
    //     } else {
    //       Alert.alert('Error', 'Phone number is not available for dialing');
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity onPress={makePhoneCall}>
      <Icon name="phone" size={20} color="#22282b" />
    </TouchableOpacity>
  );
};

export default memo(PhoneBtn);
