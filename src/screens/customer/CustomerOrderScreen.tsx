import React, {useState} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerOrderHeader from '../../components/customer/CustomerOrderHeader/CustomerOrderHeader';

const CustomerOrderScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <CustomerOrderHeader search={search} setSearch={setSearch} />
      <MainScrollView>
        <Text>Lorem</Text>
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderScreen);
