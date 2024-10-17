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

const CustomerReportScreen = () => {
    // State
    const [date, setDate] = useState<TDate>({
        start: '01.01.2023',
        end: '19.10.2024',
    });

    // API
    const dataRes = useGetReportsGetQuery({customerId: '98', date});

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
            {dataRes.isLoading ? (
                <MainLoader />
            ) : (
                <>
                    <MainDateRangePicker setValue={setDate} />
                    <Table columns={columns} data={tableData} />
                </>
            )}
        </Container>
    );
};

export default React.memo(CustomerReportScreen);
