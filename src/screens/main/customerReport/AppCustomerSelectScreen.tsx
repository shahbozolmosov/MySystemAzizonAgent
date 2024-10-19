import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Container from '../../../components/common/Container/Container';
import HeaderOperation from '../../../components/common/headerOperation/HeaderOperation';
import {ICustomerCard} from '../../../components/customer/CustomerCard/CustomerCard';
import CustomerReportCardList from '../../../components/customer/CustomerCard/CustomerReportCardList';
import {getAllCustomers} from '../../../database/customers';
import {getDBConnection} from '../../../database/sqlite';
import {AppCustomerReportNativeStackParamList} from '../../../routes/App/Customer/AppCustomerReportNativeStack';

type AppCustomerSelectScreenProps = NativeStackScreenProps<
    AppCustomerReportNativeStackParamList,
    'AppCustomerSelect'
>;

const AppCustomerSelectScreen = ({
    navigation,
}: AppCustomerSelectScreenProps) => {
    // State
    const [customerData, setCustomerData] = useState<ICustomerCard[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');

    useEffect(() => {
        const initDB = async () => {
            try {
                const db = await getDBConnection();
                const allCustomer = await getAllCustomers(db);

                if (allCustomer) {
                    setCustomerData(allCustomer);
                }
            } catch (err) {
                console.error('Failed to initialize database', err);
            }
        };

        initDB();
    }, []);

    const filteredData = useMemo(() => {
        return customerData.filter(item => {
            const searchingVal = searchVal.toLocaleLowerCase();
            return (
                item.fio.toLowerCase().includes(searchingVal) ||
                item.korxona.toLowerCase().includes(searchingVal) ||
                item.telefon.toLowerCase().includes(searchingVal)
            );
        });
    }, [customerData, searchVal]);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSetSearch = useCallback((val: string) => {
        setSearchVal(val);
    }, []);

    return (
        <Container>
            <HeaderOperation
                onBack={handleBack}
                title="Debet & Kredit"
                showSearch={true}
                setSearchVal={handleSetSearch}
            />
            <CustomerReportCardList list={filteredData} />
        </Container>
    );
};

export default AppCustomerSelectScreen;
