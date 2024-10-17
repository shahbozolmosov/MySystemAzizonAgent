import React from 'react';
import Container from '../../../components/common/Container/Container';
import CustomerHeaderOperation from '../../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../../components/ui/IconButton/IconButton';
import Table from '../../../components/ui/Table/Table';
import {TableColumn, TableRow} from '../../../components/ui/Table/TableRow';

type DataItem = {
    id: string;
    name: string;
    age: number;
};

const CustomerReportScreen = () => {
    const columns: TableColumn[] = [
        {
            title: '#',
            dataIndex: 'id',
            align: 'left',
        },
        {
            title: 'Title',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
    ];

    const tableData: TableRow<DataItem>[] = [
        {id: '1', name: 'John Doe', age: 28222},
        {id: '2', name: 'Jane Smith', age: 34},
        {id: '3', name: 'Sam Johnson', age: 25},
        {id: '4', name: 'Alice Johnson', age: 22},
        {id: '5', name: 'Bob Brown', age: 40},
        {id: '6', name: 'Charlie Davis', age: 29},
        {id: '7', name: 'David Wilson', age: 31},
        {id: '8', name: 'Eva Thompson', age: 26},
        {id: '9', name: 'Frank Harris', age: 35},
        {id: '10', name: 'Grace Lee', age: 27},
        {id: '11', name: 'Henry Clark', age: 30},
        {id: '12', name: 'Isabella Moore', age: 33},
        {id: '13', name: 'Jack Hall', age: 23},
        {id: '14', name: 'Karen Allen', age: 24},
        {id: '15', name: 'Liam Young', age: 32},
        {id: '16', name: 'Mia King', age: 28},
        {id: '17', name: 'Nathan Scott', age: 36},
        {id: '18', name: 'Olivia White', age: 25},
        {id: '19', name: 'Paul Adams', age: 29},
        {id: '20', name: 'Quincy Walker', age: 38},
        {id: '21', name: 'Rachel Green', age: 27},
        {id: '22', name: 'Steve Robinson', age: 34},
        {id: '23', name: 'Tina Mitchell', age: 22},
        {id: '24', name: 'Uma Carter', age: 39},
        {id: '25', name: 'Victor Evans', age: 31},
        {id: '26', name: 'Wendy Turner', age: 24},
        {id: '27', name: 'Xander Collins', age: 26},
        {id: '28', name: 'Yara Baker', age: 33},
        {id: '29', name: 'Zane Murphy', age: 35},
        {id: '30', name: 'Amy Foster', age: 30},
        {id: '31', name: 'Ben Reed', age: 32},
        {id: '32', name: 'Cathy Diaz', age: 28},
        {id: '33', name: 'Dan Brooks', age: 36},
        {id: '34', name: 'Emma Hughes', age: 29},
        {id: '35', name: 'Fred Gonzales', age: 27},
        {id: '36', name: 'Gina Wallace', age: 31},
        {id: '37', name: 'Hank Bennett', age: 23},
        {id: '38', name: 'Ivy Ramirez', age: 40},
        {id: '39', name: 'Jake Cox', age: 25},
        {id: '40', name: 'Katie Richardson', age: 26},
        {id: '41', name: 'Leo Price', age: 34},
        {id: '42', name: 'Megan Howard', age: 35},
        {id: '43', name: 'Nick Ward', age: 29},
        {id: '44', name: 'Oscar Perry', age: 38},
        {id: '45', name: 'Penny Sanders', age: 24},
        {id: '46', name: 'Quinn James', age: 28},
        {id: '47', name: 'Ruby Stewart', age: 33},
        {id: '48', name: 'Stan Morris', age: 27},
        {id: '49', name: 'Terry Lopez', age: 30},
        {id: '50', name: 'Vera Morgan', age: 32},
    ];

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
            <Table columns={columns} data={tableData} />
        </Container>
    );
};

export default React.memo(CustomerReportScreen);
