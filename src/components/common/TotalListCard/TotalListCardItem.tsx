import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export type TotalListCardItemProps = {
    label: string;
    value: number;
};

const TotalListCardItem = ({label, value}: TotalListCardItemProps) => {
    return (
        <View style={styles.box}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value.toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        marginVertical: 4,
        borderBottomColor: '#F7F8F9',
        borderBottomWidth: 1,
        paddingVertical: 2,
    },
    label: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: '#1e232c',
    },
    value: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 14,
        color: '#1e232c',
    },
});
export default React.memo(TotalListCardItem);
