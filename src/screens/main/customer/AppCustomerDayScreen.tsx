import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container/Container.tsx';
import {ICustomerCard} from '../../../components/customer/CustomerCard/CustomerCard.tsx';
import CustomerCardList from '../../../components/customer/CustomerCard/CustomerCardList';
import {getAllCustomers} from '../../../database/customers.ts';
import {getDBConnection} from '../../../database/sqlite.ts';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {AppTabStackParamList} from '../../../routes/App/AppTabStack.tsx';

type AppCustomerDayScreenProps = MaterialTopTabScreenProps<
    AppTabStackParamList,
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
        <Container safeArea={false}>
            <CustomerCardList list={customerData} />
        </Container>
    );
}

export default React.memo(AppCustomerDayScreen);
