import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const MainLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'#007fff'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
    },
});

export default React.memo(MainLoader);
