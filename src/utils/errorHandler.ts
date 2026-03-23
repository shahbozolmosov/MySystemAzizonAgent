import Toast from 'react-native-toast-message';

interface ErrorResponse {
  data: {
    message: string;
  };
}

export const handleError = (err: unknown) => {
  if(err && typeof err === 'object' && 'status' in err && err?.status === 'FETCH_ERROR'){
    Toast.show({
      type: 'error',
      text1: "Ulanishda xatolik!",
      text2: "Qaytadan urinib ko'ring.",
    });
  }else if (err && typeof err === 'object' && 'data' in err) {
    const {data} = err as ErrorResponse;
    Toast.show({
      type: 'error',
      text1: 'Xatolik',
      text2: data.message,
    });
  } else if (err instanceof Error) {
    // General error message
    console.log('render', err.message || 'An error occurred');
  } else {
    Toast.show({
      type: 'error',
      text1: "Noma'lum xatolik!",
      text2: "Qaytadan urinib ko'ring yoki bizga xabar bering.",
    });
  }
};
