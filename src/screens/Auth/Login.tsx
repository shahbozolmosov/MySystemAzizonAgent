import {Button, Input} from '@rneui/base';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup'; // Yup for validation
import Container from '../../components/common/Container/Container';

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
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.title}>Login</Text>

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
                  label="Login"
                  placeholder="Login"
                  onChangeText={handleChange('login')}
                  onBlur={handleBlur('login')}
                  value={values.login}
                  errorMessage={
                    touched.login && errors.login ? errors.login : ''
                  }
                />

                <Input
                  label="Parol"
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
    marginVertical: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d1017',
  },
  button: {
    // backgroundColor: '#007bff',
    marginTop: 20,
    // borderRadius: 8,
  },
});
