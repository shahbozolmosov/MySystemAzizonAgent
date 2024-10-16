import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {ICustomerCard} from '../../../components/customer/CustomerCard/CustomerCard.tsx';
import CustomerCardList from '../../../components/customer/CustomerCard/CustomerCardList';
import {getAllCustomers} from '../../../database/customers.ts';
import {getDBConnection} from '../../../database/sqlite.ts';
import {AppNativeStackParamList} from '../../../routes/App/AppNativeStack.tsx';

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

    return (
        <>
            <CustomerCardList list={customerData} />
        </>
    );
}

export default React.memo(AppCustomerDayScreen);
