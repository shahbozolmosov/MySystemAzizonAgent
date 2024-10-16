import React, { useCallback } from 'react';
import {Text} from 'react-native';
import Container from '../../../components/common/Container/Container';
import AppPageHeader from '../../../components/common/AppPageHeader/AppPageHeader';

// const AppCustomerDayAddScreenProps = 

const AppCustomerDayAddScreen = () => {

    const handleNavigateBack = useCallback(() => {

    },[])
    
    return (
        <Container>
            <AppPageHeader title='Mijoz biriktirish' onBack={handleNavigateBack} />
            <Text>AppCustomerDayAddScreen</Text>
        </Container>
    );
};

export default AppCustomerDayAddScreen;
