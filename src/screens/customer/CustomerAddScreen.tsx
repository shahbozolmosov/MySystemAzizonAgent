import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Input} from '@rneui/themed';
import {ICustomerAdd} from '../../app/services/customer/customer.ts';
import AppPageHeader from '../../components/common/AppPageHeader/AppPageHeader.tsx';
import Container from '../../components/common/Container/Container.tsx';
import {Dropdown} from 'react-native-element-dropdown'; // Dropdown import qiling
import {SafeAreaView} from 'react-native-safe-area-context';

// Validation schema using Yup
const CustomerSchema = Yup.object().shape({
  fio: Yup.string().required('FIO is required'),
  telefon: Yup.string().required('Telefon is required'),
  direktor: Yup.string().required('Direktor is required'),
  direktor_telefon: Yup.string().required('Direktor telefon is required'),
  telegram_id: Yup.number().required('Telegram ID is required'),
  korxona: Yup.string().required('Korxona is required'),
  manzil: Yup.string().required('Manzil is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
  viloyat_id: Yup.string().required('Viloyat ID is required'),
  tuman_id: Yup.string().required('Tuman ID is required'),
  category_id: Yup.string().required('Category ID is required'),
  dostavka_id: Yup.string().required('Dostavka ID is required'),
});

const CustomerAddScreen = () => {
  const formik = useFormik<ICustomerAdd>({
    initialValues: {
      fio: '',
      telefon: '',
      direktor: '',
      direktor_telefon: '',
      telegram_id: '',
      korxona: '',
      manzil: '',
      lokatsiya: '',
      latitude: '',
      longitude: '',
      viloyat_id: '2',
      tuman_id: '',
      category_id: '',
      dostavka_id: '',
    },
    validationSchema: CustomerSchema,
    onSubmit: values => {
      console.log('Form submitted:', values);
    },
  });

  // Example data for Dropdown components
  const viloyatlar = [
    {id: '1', name: 'Viloyat 1'},
    {id: '2', name: 'Viloyat 2'},
  ];

  const tumans = [
    {id: '1', name: 'Tuman 1'},
    {id: '2', name: 'Tuman 2'},
  ];

  const categories = [
    {id: '1', name: 'Category 1'},
    {id: '2', name: 'Category 2'},
  ];

  const dostavkalar = [
    {id: '1', name: 'Dostavka 1'},
    {id: '2', name: 'Dostavka 2'},
  ];

  console.log('tuman_id-------', formik.values.viloyat_id);

  return (
    <Container>
      <AppPageHeader onBack={() => {}} title={"Mijoz qo'shish"} />
      <ScrollView>
        <View style={styles.container}>
          {/* Viloyat Select */}
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdown}
              data={viloyatlar}
              labelField="name"
              valueField="id"
              placeholder="Viloyatni tanlang"
              value={formik.values.viloyat_id}
              onFocus={() => formik.setFieldTouched('viloyat_id', true)}
              onChange={item => {
                formik.setFieldValue('viloyat_id', item.id);
              }}
              onBlur={() => formik.handleBlur('viloyat_id')}
            />
            {formik.touched.viloyat_id && formik.errors.viloyat_id && (
              <Text style={styles.errorText}>{formik.errors.viloyat_id}</Text>
            )}
          </View>

          {/* Tuman Select */}
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdown}
              data={tumans}
              labelField="name"
              valueField="id"
              placeholder="Tumanni tanlang"
              value={formik.values.tuman_id}
              onFocus={() => formik.setFieldTouched('tuman_id', true)}
              onChange={item => {
                formik.setFieldValue('tuman_id', item.id);
              }}
              onBlur={() => formik.handleBlur('tuman_id')}
            />
            {formik.touched.tuman_id && formik.errors.tuman_id && (
              <Text style={styles.errorText}>{formik.errors.tuman_id}</Text>
            )}
          </View>

          {/* Category Select */}
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdown}
              data={categories}
              labelField="name"
              valueField="id"
              placeholder="Kategoriya tanlang"
              value={formik.values.category_id}
              onFocus={() => formik.setFieldTouched('category_id', true)}
              onChange={item => {
                formik.setFieldValue('category_id', item.id);
              }}
              onBlur={() => formik.handleBlur('category_id')}
            />
            {formik.touched.category_id && formik.errors.category_id && (
              <Text style={styles.errorText}>{formik.errors.category_id}</Text>
            )}
          </View>

          {/* Dostavka Select */}
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdown}
              data={dostavkalar}
              labelField="name"
              valueField="id"
              placeholder="Dostavka tanlang"
              value={formik.values.dostavka_id}
              onFocus={() => formik.setFieldTouched('dostavka_id', true)}
              onChange={item => {
                formik.setFieldValue('dostavka_id', item.id);
              }}
              onBlur={() => formik.handleBlur('dostavka_id')}
            />
            {formik.touched.dostavka_id && formik.errors.dostavka_id && (
              <Text style={styles.errorText}>{formik.errors.dostavka_id}</Text>
            )}
          </View>

          <Input
            placeholder="FIO"
            value={formik.values.fio}
            onChangeText={formik.handleChange('fio')}
            onBlur={formik.handleBlur('fio')}
            errorMessage={
              formik.touched.fio && formik.errors.fio ? formik.errors.fio : ''
            }
          />

          <Input
            placeholder="Telefon"
            value={formik.values.telefon}
            onChangeText={formik.handleChange('telefon')}
            onBlur={formik.handleBlur('telefon')}
            errorMessage={
              formik.touched.telefon && formik.errors.telefon
                ? formik.errors.telefon
                : ''
            }
          />

          <Input
            placeholder="Direktor"
            value={formik.values.direktor}
            onChangeText={formik.handleChange('direktor')}
            onBlur={formik.handleBlur('direktor')}
            errorMessage={
              formik.touched.direktor && formik.errors.direktor
                ? formik.errors.direktor
                : ''
            }
          />

          <Input
            placeholder="Direktor Telefon"
            value={formik.values.direktor_telefon}
            onChangeText={formik.handleChange('direktor_telefon')}
            onBlur={formik.handleBlur('direktor_telefon')}
            errorMessage={
              formik.touched.direktor_telefon && formik.errors.direktor_telefon
                ? formik.errors.direktor_telefon
                : ''
            }
          />

          <Input
            placeholder="Telegram ID"
            keyboardType="numeric"
            value={formik.values.telegram_id.toString()}
            onChangeText={text =>
              formik.setFieldValue('telegram_id', Number(text))
            }
            onBlur={formik.handleBlur('telegram_id')}
            errorMessage={
              formik.touched.telegram_id && formik.errors.telegram_id
                ? formik.errors.telegram_id
                : ''
            }
          />

          <Input
            placeholder="Korxona"
            value={formik.values.korxona}
            onChangeText={formik.handleChange('korxona')}
            onBlur={formik.handleBlur('korxona')}
            errorMessage={
              formik.touched.korxona && formik.errors.korxona
                ? formik.errors.korxona
                : ''
            }
          />

          <Input
            placeholder="Manzil"
            value={formik.values.manzil}
            onChangeText={formik.handleChange('manzil')}
            onBlur={formik.handleBlur('manzil')}
            errorMessage={
              formik.touched.manzil && formik.errors.manzil
                ? formik.errors.manzil
                : ''
            }
          />

          <View style={styles.submitSection}>
            <Button
              title="Submit"
              size={'lg'}
              onPress={formik.handleSubmit as (values: any) => void}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  submitSection: {
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomerAddScreen;
