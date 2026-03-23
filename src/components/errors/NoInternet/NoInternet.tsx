import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button, Image} from '@rneui/themed';
import ErrImage from '../../../../assets/no-internet.png';

type NoInternetProps = {
    refetch: () => void;
    desc?: string;
};

const NoInternet = ({
    refetch,
    desc = "Qaytadan urinib ko'1ring yoki biz bilan bog'laning!",
}: NoInternetProps) => {
    const handleRefetch = useCallback(() => {
        refetch();
    }, [refetch]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={ErrImage} />
            <Text style={styles.title}>Ulanishda xatolik</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Button title={'Qayta urinish'} onPress={handleRefetch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 140,
        height: 123,
        marginBottom: 30,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 18,
        color: '#939090',
        marginBottom: 4,
    },
    desc: {
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 40,
    },
});

export default React.memo(NoInternet);
