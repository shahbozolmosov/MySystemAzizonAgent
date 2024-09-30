import {createTheme} from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#1e232c',
    secondary: '#007fff',
    error: '#ff5d5d',
  },
  darkColors: {
    primary: '#ffffff',
  },
  mode: 'light',
  components: {
    Text: {
      style: {
        fontFamily: 'Roboto-Black',
        color: '#0d1017',
      },
    },
    Button: {
      buttonStyle: {
        borderRadius: 8,
        paddingHorizontal: 10,
      },
      titleStyle: {
        fontFamily: 'Roboto-Medium',
      },
    },
    Input: {
      inputStyle: {
        padding: 14,
        fontSize: 18,
        backgroundColor: '#F7F8F9',
        color: '#333',
        borderColor: '#E8ECF4',
        borderRadius: 8,
        borderWidth: 1,
      },
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        // borderBottomColor: '#007bff',
      },
      placeholderTextColor: '#8391A1',
    },
  },
});
