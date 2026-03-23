import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {DashboardItem} from '../../../app/services/dashboard/dashboard';

export interface DashboardCardProps extends DashboardItem {
    icon: ImageSourcePropType;
}

const DashboardCard = ({name, value, icon}: DashboardCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.amount}>{value}</Text>
            </View>
            <Image style={styles.image} source={icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: widowWidth / 2 - 22,
        // width: widowWidth - (8 + 12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        padding: 16,
        marginHorizontal: 14,
        marginBottom: 24,
        borderRadius: 14,
        elevation: 20,
        shadowColor: 'rgba(153, 161, 169, 0.5)',
        shadowOffset: {
            width: 400,
            height: 100,
        },
        shadowRadius: 10,
        backgroundColor: '#ffff',
    },
    body: {
        flexGrow: 1,
    },
    title: {
        marginBottom: 14,
        fontFamily: 'Roboto-Medium',
        fontWeight: '600',
        fontSize: 16,
        color: '#202224',
        opacity: 0.7,
    },
    amount: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 28,
        letterSpacing: 0.04,
        color: '#202224',
    },
    image: {
        width: 44,
        height: 44,
    },
});
export default React.memo(DashboardCard);
