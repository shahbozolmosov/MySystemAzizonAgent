import {Button, Input, Text} from '@rneui/themed';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup'; // Yup for validation
import {IAuthLogin, useLoginMutation} from '../../app/services/auth/auth';
import Container from '../../components/common/Container/Container';
import {handleError} from '../../utils/errorHandler';

// Yup validation schema
const validationSchema = Yup.object().shape({
  login: Yup.string().required('Login talab qilinadi'),
  parol: Yup.string().required('Parol talab qilinadi'),
});

const initialValues: IAuthLogin = {
  login: '',
  parol: '',
};

export default function Login(): JSX.Element {
  // Api
  const [login] = useLoginMutation();

  return (
    <Container>
      <ScrollView focusable={false}>
        <View style={styles.body}>
          <Text style={styles.title}>Xush kelibsiz!</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async values => {
              try {
                const res = await login(values).unwrap();

                if (res.success) {
                  if (res.data.rol === 'agent') {
                    Toast.show({
                      type: 'success',
                      text1: 'Muvaffaqiyatli',
                      text2: res.message,
                    });
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Xato',
                      text2: 'Login yoki parol xato!',
                    });
                  }
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Xato',
                    text2: res.message,
                  });
                }

                console.log('login res ->>>>', res);
              } catch (err) {
                handleError(err);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <Input
                  containerStyle={styles.inputContainer}
                  autoFocus
                  placeholder="Login"
                  onChangeText={handleChange('login')}
                  onBlur={handleBlur('login')}
                  value={values.login}
                  errorMessage={
                    touched.login && errors.login ? errors.login : ''
                  }
                  disabled={isSubmitting}
                />

                <Input
                  containerStyle={styles.inputContainer}
                  placeholder="Parol"
                  secureTextEntry
                  onChangeText={handleChange('parol')}
                  onBlur={handleBlur('parol')}
                  value={values.parol}
                  errorMessage={
                    touched.parol && errors.parol ? errors.parol : ''
                  }
                  disabled={isSubmitting}
                />

                <Button
                  size="lg"
                  title={'Login'}
                  buttonStyle={styles.button}
                  onPress={handleSubmit as (values: any) => void}
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 150,
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 42,
    marginBottom: 32,
    color: '#0d1017',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  button: {
    // backgroundColor: '#007bff',
    marginTop: 20,
    // padding: 18,
    // borderRadius: 8,
  },
});
