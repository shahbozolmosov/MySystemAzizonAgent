import {Button, Input} from '@rneui/base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Formik} from 'formik';
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
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => {
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
              placeholder="example.login"
              onChangeText={handleChange('login')}
              onBlur={handleBlur('login')}
              value={values.login}
              errorMessage={touched.login && errors.login ? errors.login : ''}
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
              title={'Login'}
              buttonStyle={styles.button}
              onPress={handleSubmit as (values: any) => void}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 20,
  },
});
