import {createTheme} from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#1e232c',
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
      // raised: true,
      buttonStyle: {
        borderRadius: 8,
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
      inputContainerStyle: {
        borderBottomWidth: 0,
        // borderBottomColor: '#007bff',
      },
      placeholderTextColor: '#8391A1',
    },
  },
});
