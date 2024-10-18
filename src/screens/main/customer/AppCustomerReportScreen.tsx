import React, {useCallback, useMemo, useState} from 'react';
import AppPageHeader from '../../../components/common/AppPageHeader/AppPageHeader';
import Container from '../../../components/common/Container/Container';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack';
import {TableColumn, TableRow} from '../../../components/ui/Table/TableRow';
import {TDate} from '../../../types/types';
import { handleApiResponseObj } from '../../../utils/handleApiResponseObj';
import { ReportGetAktItem, ReportGetData, useGetReportsGetQuery } from '../../../app/services/customerReport/customerReport';
import { ScrollView } from 'react-native-gesture-handler';
import MainDateRangePicker from '../../../components/ui/MainDateRangePicker/MainDateRangePicker';
import MainLoader from '../../../components/ui/MainLoader/MainLoader';
import NoInternet from '../../../components/errors/NoInternet/NoInternet';
import NoResult from '../../../components/errors/NoResult/NoResult';
import { View } from 'react-native';
import Table from '../../../components/ui/Table/Table';
import { useNetIsConnected } from '../../../hook/useNetIsConnected';

type AppCustomerReportScreenProps = DrawerScreenProps<
    AppRootDrawerStackParamList,
    'CustomerReport'
>;

const columns: TableColumn[] = [
    {
        title: '#',
        dataIndex: 'id',
        align: 'left',
    },
    {
        title: 'Debet',
        dataIndex: 'debit',
    },
    {
        title: 'Kredit',
        dataIndex: 'kredit',
    },
    {
        title: 'Izoh',
        dataIndex: 'izoh',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Sana',
        dataIndex: 'sana',
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
    const dataRes = useGetReportsGetQuery(
        {customerId: '98', date},
        {
            skip: !isConnected,
        },
    );

    // Data
    const allData = useMemo<ReportGetData | null>(() => {
        return handleApiResponseObj(dataRes);
    }, [dataRes]);

    const tableData = useMemo<TableRow<ReportGetAktItem>[]>(() => {
        if (!allData) {
            return [];
        }

        if (allData.akt) {
            return allData.akt;
        }

        return [];
    }, [allData]);

    const totalData = useMemo(() => {
        if (allData) {
            return {
                debit: allData.jamidebit,
                kredit: allData.jamikredit,
            };
        }
        return {
            debit: 0,
            kredit: 0,
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
