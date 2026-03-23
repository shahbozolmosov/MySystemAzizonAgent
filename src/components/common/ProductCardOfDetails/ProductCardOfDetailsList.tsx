import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import ProductCardOfDetails, {
  ProductCardOfDetailsProps,
} from './ProductCardOfDetails.tsx';

type ProductCardOfDetailsListProps = {
  list: ProductCardOfDetailsProps[];
};

const ProductCardOfDetailsList = ({list}: ProductCardOfDetailsListProps) => {
  const renderItem = useCallback(
    ({item}: {item: ProductCardOfDetailsProps}) => {
      return <ProductCardOfDetails {...item} />;
    },
    [],
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ProductCardOfDetailsList;
