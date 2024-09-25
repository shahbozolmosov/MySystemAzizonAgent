import React, {useState} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import MainScrollView from '../../components/common/MainScrollView/MainScrollView';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import IconButton from '../../components/ui/IconButton/IconButton';

const CustomerOrderAddScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <CustomerHeaderOperation
        title="Umumiy"
        showSearch
        customElements={
          <>
            <IconButton icon="filter" />
          </>
        }
      />
      <MainScrollView>
        <Text>Yangi buyurtma</Text>
      </MainScrollView>
    </Container>
  );
};

export default React.memo(CustomerOrderAddScreen);
