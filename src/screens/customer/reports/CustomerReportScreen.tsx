import React, {useMemo, useState} from 'react';
import Container from '../../../components/common/Container/Container';
import CustomerHeaderOperation from '../../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../../components/ui/IconButton/IconButton';
import Table from '../../../components/ui/Table/Table';
import {TableColumn, TableRow} from '../../../components/ui/Table/TableRow';
import {
    ReportGetAktItem,
    ReportGetData,
    useGetReportsGetQuery,
} from '../../../app/services/customerReport/customerReport';
import {TDate} from '../../../types/types';
import {handleApiResponseObj} from '../../../utils/handleApiResponseObj';
import MainLoader from '../../../components/ui/MainLoader/MainLoader';
import MainDateRangePicker from '../../../components/ui/MainDateRangePicker/MainDateRangePicker';
import {useNetIsConnected} from '../../../hook/useNetIsConnected';
import NoInternet from '../../../components/errors/NoInternet/NoInternet';
import NoResult from '../../../components/errors/NoResult/NoResult';
import TotalListCard from '../../../components/common/TotalListCard/TotalListCard';
import {TotalListCardItemProps} from '../../../components/common/TotalListCard/TotalListCardItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions, View} from 'react-native';

const columns: TableColumn[] = [
    {
        title: '#',
        dataIndex: 'id',
        align: 'left',
    },
    {
        title: 'Debit',
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

const windowHeight = Dimensions.get('window').height;

const CustomerReportScreen = () => {
    // State
    const [date, setDate] = useState<TDate>({
        start: '01.01.2023',
        end: '19.10.2024',
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

    const totalCardData = useMemo<TotalListCardItemProps[]>(() => {
        return [
            {
                label: 'Debit',
                value: allData?.jamidebit || 0,
            },
            {
                label: 'Kredit',
                value: allData?.jamikredit || 0,
            },
            {
                label: "To'lov",
                value: allData?.jamitolov || 0,
            },
            {
                label: 'Saldo',
                value: allData?.saldo || 0,
            },
            {
                label: 'Massa',
                value: allData?.jamimassa || 0,
            },
        ];
    }, [allData]);

    return (
        <Container>
            <CustomerHeaderOperation
                title="Hisobot"
                customElements={
                    <>
                        <IconButton icon="filter" />
                    </>
                }
                borderShown={false}
            />

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

export default React.memo(CustomerReportScreen);
