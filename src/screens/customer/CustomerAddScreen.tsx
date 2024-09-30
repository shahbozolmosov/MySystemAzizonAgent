import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Input} from '@rneui/themed';
import {ICustomerAdd} from '../../app/services/customer/customer.ts';
import AppPageHeader from '../../components/common/AppPageHeader/AppPageHeader.tsx';
import Container from '../../components/common/Container/Container.tsx';
import {Dropdown} from 'react-native-element-dropdown'; // Dropdown import qiling
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  District,
  Region,
  useGetDistrictByRegionQuery,
  useGetRegionQuery,
} from '../../app/services/region/region.ts';
import {handleApiResponse} from '../../utils/handleApiResponse.ts';

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

const initialValues: ICustomerAdd = {
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
  viloyat_id: '7',
  tuman_id: '39',
  category_id: '',
  dostavka_id: '',
};

const CustomerAddScreen = () => {
  const formik = useFormik<ICustomerAdd>({
    initialValues,
    validationSchema: CustomerSchema,
    onSubmit: values => {
      console.log('Form submitted:', values);
    },
  });

  // API
  const regionRes = useGetRegionQuery();
  const districtByRegionRes = useGetDistrictByRegionQuery(
    formik.values.viloyat_id,
    {
      skip: !formik.values.viloyat_id,
    },
  );

  const regionOptions = useMemo<Region[]>(() => {
    return handleApiResponse<Region[]>(regionRes);
  }, [regionRes]);

  const districtOptions = useMemo<District[]>(() => {
    return handleApiResponse<District[]>(districtByRegionRes);
  }, [districtByRegionRes]);

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
              search={true}
              style={styles.dropdown}
              itemTextStyle={styles.dropdownItemText}
              inputSearchStyle={styles.dropdownSearchInput}
              containerStyle={styles.dropdownItemContainer}
              searchPlaceholder={'Qidirish'}
              data={regionOptions}
              labelField="nomi"
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
              search={true}
              style={styles.dropdown}
              itemTextStyle={styles.dropdownItemText}
              inputSearchStyle={styles.dropdownSearchInput}
              containerStyle={styles.dropdownItemContainer}
              searchPlaceholder={'Qidirish'}
              data={districtOptions}
              labelField="nomi"
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
              itemTextStyle={styles.dropdownItemText}
              inputSearchStyle={styles.dropdownSearchInput}
              containerStyle={styles.dropdownItemContainer}
              searchPlaceholder={'Qidirish'}
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
              itemTextStyle={styles.dropdownItemText}
              inputSearchStyle={styles.dropdownSearchInput}
              containerStyle={styles.dropdownItemContainer}
              searchPlaceholder={'Qidirish'}
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
  // Dropdown
  dropdown: {
    height: 60,
    borderColor: '#e9edf4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#f7f8f9',
  },
  dropdownItemText: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  dropdownSearchInput: {
    borderRadius: 6,
    backgroundColor: '#f7f8f9',
    color: '#0d1017',
  },
  dropdownItemContainer: {
    borderRadius: 10,
    elevation: 40,
    shadowColor: 'rgba(153, 161, 169, 1)',
    shadowOffset: {
      width: 400,
      height: 100,
    },
    shadowRadius: 10,
    backgroundColor: '#ffff',
  },
  errorText: {
    color: '#ff5d5d',
    fontSize: 12,
    marginTop: 4,
  },
  // Dropdown end
  submitSection: {
    marginTop: 30,
  },
});

export default CustomerAddScreen;
