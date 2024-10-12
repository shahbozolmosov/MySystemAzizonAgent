import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {AppDrawerStackParamList} from '../../../routes/App/AppRootStack.tsx';
import OrderCard, {IOrderCard} from './OrderCard';

type OrderCardList = {
    list: IOrderCard[];
};

type CustomerCardListNavigationProp =
    NativeStackNavigationProp<AppDrawerStackParamList>;

const AppOrderCardList = ({list}: OrderCardList) => {
    const navigation = useNavigation<CustomerCardListNavigationProp>();

    const handleNavigate = useCallback(
        (orderId: string) => {
            navigation.push('AppOrderDetails', {orderId});
        },
        [navigation],
    );

    const renderItem = useCallback(
        ({item}: {item: IOrderCard}) => {
            return <OrderCard {...item} onNavigate={handleNavigate} />;
        },
        [handleNavigate],
    );

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
};

export default React.memo(AppOrderCardList);
