import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup'; // Yup for validation
import Container from '../../components/common/Container/Container';
import {Button, Input, Text} from '@rneui/themed';

// Yup validation schema
const validationSchema = Yup.object().shape({
  login: Yup.string().required('Login talab qilinadi'),
  password: Yup.string()
    .min(6, "6ta belgidan kam bo'lmasin")
    .required('Parol talab qilinadi'),
});

export default function Login(): JSX.Element {
  return (
    <Container>
      <ScrollView focusable={false}>
        <View style={styles.body}>
          <Text style={styles.title}>Xush kelibsiz!</Text>

          <Formik
            initialValues={{login: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              if (values.login !== 'admin') {
                Toast.show({
                  type: 'error',
                  text1: 'Xatolik',
                  text2: 'Login yoki parol xato',
                });
                return;
              }
              // Login action with values.email and values.password
              console.log(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Input
                  autoFocus
                  placeholder="Login"
                  onChangeText={handleChange('login')}
                  onBlur={handleBlur('login')}
                  value={values.login}
                  errorMessage={
                    touched.login && errors.login ? errors.login : ''
                  }
                />

                <Input
                  placeholder="Parol"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errorMessage={
                    touched.password && errors.password ? errors.password : ''
                  }
                />

                <Button
                  size="lg"
                  title={'Login'}
                  buttonStyle={styles.button}
                  onPress={handleSubmit as (values: any) => void}
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
    marginTop: 200,
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
  button: {
    // backgroundColor: '#007bff',
    marginTop: 20,
    padding: 18,
    // borderRadius: 8,
  },
});
