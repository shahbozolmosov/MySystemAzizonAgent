import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type ContainerProps = {
    children: React.ReactNode;
    paddingHorizontal?: number;
    safeArea?: boolean;
};

export default function Container({
    children,
    paddingHorizontal,
    safeArea = true,
}: ContainerProps) {
    return safeArea ? (
        <SafeAreaView style={[styles.container, {paddingHorizontal}]}>
            {children}
        </SafeAreaView>
    ) : (
        <View style={[styles.container, {paddingHorizontal}]}>{children}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
