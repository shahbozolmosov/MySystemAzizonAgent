import React, {useMemo} from 'react';
import {
  ICustomer,
  useGetCustomerAllQuery,
} from '../../app/services/customer/customer';
import Container from '../../components/common/Container/Container';
import CustomerCardList from '../../components/common/CustomerCard/CustomerCardList';
import {handleApiResponse} from '../../utils/handleApiResponse';

function HomeScreen() {
  // API
  const customerRes = useGetCustomerAllQuery();

  const customerData = useMemo<ICustomer[]>(() => {
    return handleApiResponse<ICustomer[]>(customerRes);
  }, [customerRes]);

  return (
    <Container paddingHorizontal={0}>
      <CustomerCardList list={customerData} />
    </Container>
  );
}

export default React.memo(HomeScreen);
