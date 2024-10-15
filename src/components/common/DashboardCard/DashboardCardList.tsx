import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import DashboardCard, {DashboardCardProps} from './DashboardCard';

type DashboardCardListProps = {
    list: DashboardCardProps[];
};

const DashboardCardList = ({list}: DashboardCardListProps) => {
    const renderItem = useCallback(({item}: {item: DashboardCardProps}) => {
        return <DashboardCard {...item} />;
    }, []);

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

export default React.memo(DashboardCardList);
