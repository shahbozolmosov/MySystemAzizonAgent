import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Icon from '../../../../assets/icons/users-icon.png';

const widowWidth = Dimensions.get('window').width;

const DashboardCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>Total User</Text>
                <Text style={styles.amount}>40,689</Text>
            </View>
            <Image style={styles.image} source={Icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: widowWidth / 2 - 22,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 10,
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
    body: {},
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
