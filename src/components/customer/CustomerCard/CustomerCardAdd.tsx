import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomerCardAdd = () => {
    return (
        <TouchableOpacity style={styles.btn}>
            <Icon style={styles.icon} size={24} name="plus" />
            <Text style={styles.title}>Mijoz</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
        margin: 14,
        borderColor: '#E8ECF4',
    },
    icon: {
        color: '#8391A1',
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 16,
        color: '#8391A1',
    },
});
export default React.memo(CustomerCardAdd);
