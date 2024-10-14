import React from 'react';
import {StyleSheet, View} from 'react-native';
import DashboardCard, {DashboardCardProps} from './DashboardCard';

type DashboardCardListProps = {
    list: DashboardCardProps[];
};

const DashboardCardList = ({list}: DashboardCardListProps) => {
    return (
        <View style={styles.list}>
            {list.map(item => (
                <DashboardCard {...item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        gap: 16,
    },
});
export default React.memo(DashboardCardList);
