import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack.tsx';
import OrderDraftCard, {IOrderDraftCard} from './OrderDraftCard.tsx';

type AppOrderDraftCardListProps = {
    list: IOrderDraftCard[];
};

type AppOrderDraftCardListNavigationProp =
    NativeStackNavigationProp<AppRootDrawerStackParamList>;

const AppOrderDraftCardList = ({list}: AppOrderDraftCardListProps) => {
    const navigation = useNavigation<AppOrderDraftCardListNavigationProp>();

    const handleNavigate = useCallback(
        (orderId: string, customerId: string) => {
            navigation.push('AppOrderDraftDetails', {customerId, orderId});
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

export default React.memo(AppOrderDraftCardList);
