import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppCustomerReportNativeStackParamList} from '../../../routes/App/Customer/AppCustomerReportNativeStack';
import CustomerCard, {ICustomerCard} from './CustomerCard';

type CustomerReportCardListProps = {
    list: ICustomerCard[];
};

type CustomerCardListNavigationProp = NativeStackNavigationProp<
    AppCustomerReportNativeStackParamList,
    'AppCustomerSelect'
>;
const CustomerReportCardList = ({list}: CustomerReportCardListProps) => {
    const navigation = useNavigation<CustomerCardListNavigationProp>();

    const handleNavigate = useCallback(
        (customerId: string) => {
            navigation.push('AppCustomerReport', {customerId});
        },
        [navigation],
    );

    const renderItem = useCallback(
        ({item}: {item: ICustomerCard}) => {
            return <CustomerCard {...item} onNavigate={handleNavigate} />;
        },
        [handleNavigate],
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
});

export default React.memo(CustomerReportCardList);
