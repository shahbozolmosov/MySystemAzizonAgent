import React, {useCallback} from 'react';
import {Text} from 'react-native';
import Container from '../../../components/common/Container/Container';
import AppPageHeader from '../../../components/common/AppPageHeader/AppPageHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNativeStackParamList} from '../../../routes/App/AppNativeStack';

type AppCustomerDayAddScreenProps = NativeStackScreenProps<
    AppNativeStackParamList,
    'AppCustomerDayAdd'
>;

const AppCustomerDayAddScreen = ({
    navigation,
}: AppCustomerDayAddScreenProps) => {
    const handleNavigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Container>
            <AppPageHeader
                title="Mijoz biriktirish"
                onBack={handleNavigateBack}
            />
            <Text>AppCustomerDayAddScreen</Text>
        </Container>
    );
};

export default AppCustomerDayAddScreen;
