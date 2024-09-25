import {Button} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';

const CustomerOrderScreen = () => {
  return (
    <Container>
      <CustomerHeaderOperation
        customElements={
          <Button title={'Yangi'} size="sm" color={'secondary'} />
        }
      />
      <MainScrollView>
        <Text>Lorem</Text>
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderScreen);
