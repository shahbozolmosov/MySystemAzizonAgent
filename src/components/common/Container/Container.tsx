import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type ContainerProps = {
    children: React.ReactNode;
    paddingHorizontal?: number;
};

function Container({children, paddingHorizontal}: ContainerProps) {
    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal}]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default React.memo(Container);
