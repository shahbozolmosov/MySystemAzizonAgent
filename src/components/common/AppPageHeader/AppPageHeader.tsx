import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../ui/HeaderTitle/HeaderTitle.tsx';

type AppPageHeaderProps = {
    onBack: () => void;
    title: string;
};

const windowWidth = Dimensions.get('window').width;

const AppPageHeader = ({onBack, title}: AppPageHeaderProps) => {
    const handleBack = useCallback(() => {
        onBack();
    }, [onBack]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={handleBack}>
                <Icon name="chevron-left" size={24} color={'#1e232c'} />
            </TouchableOpacity>
            {/* Header Title */}
            <View style={styles.title}>
                <HeaderTitle title={title} />
            </View>
            <View />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        paddingRight: 34,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        justifyContent: 'space-between',
    },
    btn: {
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    title: {
        maxWidth: windowWidth / 2,
    },
});

export default React.memo(AppPageHeader);
