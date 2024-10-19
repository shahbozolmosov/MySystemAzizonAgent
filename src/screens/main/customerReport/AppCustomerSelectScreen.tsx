import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppCustomerReportNativeStackParamList} from '../../../routes/App/Customer/AppCustomerReportNativeStack';

type AppCustomerSelectScreenProps = NativeStackScreenProps<
    AppCustomerReportNativeStackParamList,
    'AppCustomerSelect'
>;

const AppCustomerSelectScreen = ({}:AppCustomerSelectScreenProps) => {
    return (
        <View>
            <Text>AppCustomerSelectScreen</Text>
        </View>
    );
};

export default AppCustomerSelectScreen;
