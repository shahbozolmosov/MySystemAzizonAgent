import * as Keychain from 'react-native-keychain';

// Save the token
export const saveToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('userToken', token);
  } catch (error: any) {
    console.error('Error saving token:', error);
  }
};

// Get the token
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Token retrieved successfully');
      return credentials.password;
    }

    console.log('No token found');
    return null;
  } catch (error: any) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Delete the token
export const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token deleted successfully');
  } catch (error: any) {
    console.log('Error deleting token:', error);
  }
};
