import React from 'react';
import {StyleSheet, View} from 'react-native';
import DashboardCard from './DashboardCard';

const DashboardCardList = () => {
    return (
        <View style={styles.list}>
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
});
export default React.memo(DashboardCardList);
