import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {CustomerTabStackParamList} from '../../../routes/customer/CustomerStack.tsx';
import OrderDraftCard, {IOrderDraftCard} from './OrderDraftCard.tsx';

type OrderDraftCardListProps = {
    list: IOrderDraftCard[];
};

type CustomerCardListNavigationProp =
    NativeStackNavigationProp<CustomerTabStackParamList>;

const OrderDraftCardList = ({list}: OrderDraftCardListProps) => {
    const navigation = useNavigation<CustomerCardListNavigationProp>();

    const handleNavigate = useCallback(
        (orderId: string, customerId: string) => {
            navigation.push('CustomerOrderDraftDetails', {customerId, orderId});
        },
        [navigation],
    );

    const renderItem = useCallback(
        ({item}: {item: IOrderDraftCard}) => {
            return <OrderDraftCard {...item} onNavigate={handleNavigate} />;
        },
        [handleNavigate],
    );

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.uid.toString()}
        />
    );
};

export default React.memo(OrderDraftCardList);
