import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
    ReportDebitKreditGetAktItem,
    ReportDebitKreditGetData,
    useGetReportsDebitKreditQuery,
} from '../../../app/services/customerReport/customerReport';
import AppPageHeader from '../../../components/common/AppPageHeader/AppPageHeader';
import Container from '../../../components/common/Container/Container';
import NoInternet from '../../../components/errors/NoInternet/NoInternet';
import NoResult from '../../../components/errors/NoResult/NoResult';
import MainDateRangePicker from '../../../components/ui/MainDateRangePicker/MainDateRangePicker';
import MainLoader from '../../../components/ui/MainLoader/MainLoader';
import Table from '../../../components/ui/Table/Table';
import {TableColumn, TableRow} from '../../../components/ui/Table/TableRow';
import {useNetIsConnected} from '../../../hook/useNetIsConnected';
import {AppCustomerReportNativeStackParamList} from '../../../routes/App/Customer/AppCustomerReportNativeStack';
import {TDate} from '../../../types/types';
import {handleApiResponseObj} from '../../../utils/handleApiResponseObj';

type AppCustomerReportScreenProps = DrawerScreenProps<
    AppCustomerReportNativeStackParamList,
    'AppCustomerReport'
>;

const columns: TableColumn[] = [
    {
        title: '#',
        dataIndex: 'id',
        align: 'left',
    },
    {
        title: 'Mijoz',
        dataIndex: 'fio',
        align: 'left',
    },
    {
        title: 'Debet',
        dataIndex: 'debit',
    },
    {
        title: 'Kredit',
        dataIndex: 'jamikredit',
    },
    {
        title: 'Saldo',
        dataIndex: 'saldo',
    },
];

const AppCustomerReportScreen = ({
    navigation,
}: AppCustomerReportScreenProps) => {
    // State
    const [date, setDate] = useState<TDate>({
        start: '',
        end: '',
    });

    const isConnected = useNetIsConnected();

    // API
    const dataRes = useGetReportsDebitKreditQuery(
        {supplierId: '98', date},
        {
            skip: !isConnected,
        },
    );

    // Data
    const allData = useMemo<ReportDebitKreditGetData | null>(() => {
        return handleApiResponseObj(dataRes);
    }, [dataRes]);

    const tableData = useMemo<TableRow<ReportDebitKreditGetAktItem>[]>(() => {
        if (!allData) {
            return [];
        }

        if (allData.akt) {
            return allData.akt.map((item, index) => ({...item, id: index}));
        }

        return [];
    }, [allData]);

    const totalData = useMemo(() => {
        if (allData) {
            return {
                debit: allData.jamidebit,
                jamikredit: allData.jamikredit,
            };
        }
        return {
            debit: 0,
            jamikredit: 0,
        };
    }, [allData]);

    // Handle back
    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Container>
            <AppPageHeader title="Debet & Kredit" onBack={handleBack} />

            <ScrollView>
                <MainDateRangePicker setValue={setDate} />

                {/* <TotalListCard list={totalCardData} /> */}

                {dataRes.isLoading ? (
                    <MainLoader />
                ) : !isConnected ? (
                    <NoInternet refetch={dataRes.refetch} />
                ) : !totalData ? (
                    <NoResult
                        title="Ma'lumot topilmadi"
                        desc="Hozircha sizda jami ma'lumotlar topilmadi"
                    />
                ) : (
                    <View style={{height: 600}}>
                        <Table
                            columns={columns}
                            data={tableData}
                            total={totalData}
                        />
                    </View>
                )}
            </ScrollView>
        </Container>
    );
};

export default React.memo(AppCustomerReportScreen);
