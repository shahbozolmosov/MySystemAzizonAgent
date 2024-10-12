import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container/Container';
import SyncBtn from '../../components/common/SyncBtn/SyncBtn.tsx';
import {ICustomerCard} from '../../components/customer/CustomerCard/CustomerCard.tsx';
import CustomerCardList from '../../components/customer/CustomerCard/CustomerCardList';
import {getAllCustomers} from '../../database/customers.ts';
import {getDBConnection} from '../../database/sqlite.ts';

function HomeScreen() {
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

            <SyncBtn />
        </Container>
    );
}

export default React.memo(HomeScreen);
