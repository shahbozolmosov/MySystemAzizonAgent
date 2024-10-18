import React, {useCallback} from 'react';
import AppPageHeader from '../../../components/common/AppPageHeader/AppPageHeader';
import Container from '../../../components/common/Container/Container';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack';

type AppCustomerReportScreenProps = DrawerScreenProps<
    AppRootDrawerStackParamList,
    'CustomerAdd'
>;

const AppCustomerReportScreen = ({
    navigation,
}: AppCustomerReportScreenProps) => {
    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Container>
            <AppPageHeader title="Debet & Kredit" onBack={handleBack} />
        </Container>
    );
};

export default React.memo(AppCustomerReportScreen);
