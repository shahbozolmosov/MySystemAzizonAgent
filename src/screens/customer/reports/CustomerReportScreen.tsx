import React from 'react';
import {Text} from 'react-native';
import Container from '../../../components/common/Container/Container';
import CustomerHeaderOperation from '../../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../../components/ui/IconButton/IconButton';

const CustomerReportScreen = () => {
    return (
        <Container>
             <CustomerHeaderOperation
                title="Buyurtmalar"
                customElements={
                    <>
                        <IconButton icon="filter" />
                    </>
                }
                borderShown={false}
            />
            <Text>CustomerReport</Text>
        </Container>
    );
};

export default React.memo(CustomerReportScreen);
