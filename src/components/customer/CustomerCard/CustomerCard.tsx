import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICustomer} from '../../../app/services/customer/customer';
import PhoneBtn from '../../ui/PhoneBtn/PhoneBtn';

export interface ICustomerCard extends ICustomer {}

interface ICustomerCardProps extends ICustomerCard {
    onNavigate: (customerId: string) => void;
}

const CustomerCard = ({
    id,
    fio,
    korxona,
    telefon,
    onNavigate,
}: ICustomerCardProps) => {
    const arrFio = fio?.split(' ');
    let firstName = '';
    let lastName = '';

    if (fio) {
        firstName = arrFio[0];
        lastName = arrFio[1];
    }

    const handleNavigate = useCallback(() => {
        onNavigate(id);
    }, [id, onNavigate]);

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.touchable} onPress={handleNavigate}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {firstName?.charAt(0)}
                        {/* {lastName?.charAt(0)} */}
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.title}>{fio}</Text>
                    <Text style={styles.caption}>{korxona}</Text>
                </View>
                <View style={styles.footer}>
                    <PhoneBtn phoneNumber={telefon} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 14,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#ffff',
    },
    touchable: {
        flexDirection: 'row',
        gap: 14,
    },
    avatar: {
        width: 44,
        height: 44,
        backgroundColor: '#00aa55',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2,
    },
    avatarText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        fontWeight: '400',
        color: '#ffffffff',
    },
    body: {
        flexGrow: 1,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
        color: '#000000',
        marginBottom: 4,
    },
    caption: {
        marginBottom: 4,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 14,
        color: '#000000',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomerCard;
