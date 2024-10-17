import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {ICustomerCard} from '../../../components/customer/CustomerCard/CustomerCard.tsx';
import CustomerCardList from '../../../components/customer/CustomerCard/CustomerCardList';
import {getAllCustomers} from '../../../database/customers.ts';
import {getDBConnection} from '../../../database/sqlite.ts';
import {AppNativeStackParamList} from '../../../routes/App/AppNativeStack.tsx';
import {Button} from '@rneui/themed';
import {removeDayTable} from '../../../database/tables/day.table.ts';
import {removeUserTable} from '../../../database/tables/user.table.ts';
import {removeCustomersTable} from '../../../database/tables/customers.table.ts';
import {removeProductsTable} from '../../../database/tables/product.table.ts';
import {removeOrdersTable} from '../../../database/tables/orders.table.ts';
import {removeOrdersDraftTable} from '../../../database/tables/orderDraft.table.ts';

type AppCustomerDayScreenProps = MaterialTopTabScreenProps<
    AppNativeStackParamList,
    'AppCustomerDay'
>;

function AppCustomerDayScreen({route}: AppCustomerDayScreenProps) {
    // Params
    const {dayId} = route.params;

    // State
    const [customerData, setCustomerData] = useState<ICustomerCard[]>([]);

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

    const handleReset = async () => {
        const db = await getDBConnection();
        await removeDayTable(db);
        await removeUserTable(db);
        await removeCustomersTable(db);
        await removeProductsTable(db);
        await removeOrdersTable(db);
        await removeOrdersDraftTable(db);
    };

    return (
        <>
            <Button title={'Reset'} onPress={handleReset} />
            <CustomerCardList list={customerData} />
        </>
    );
}

export default React.memo(AppCustomerDayScreen);
