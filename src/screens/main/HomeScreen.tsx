import React, {useMemo} from 'react';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import {handleApiResponse} from '../../utils/handleApiResponse';
import CustomerCardList from '../../components/customer/CustomerCard/CustomerCardList';

function HomeScreen() {
  // API
  const customerRes = useGetCustomerAllQuery();

  const customerData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(customerRes);
  }, [customerRes]);

  return (
    <Container>
      <CustomerCardList list={customerData} />
    </Container>
  );
}

export default React.memo(HomeScreen);
