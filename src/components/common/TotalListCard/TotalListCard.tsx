import React from 'react';
import {StyleSheet, View} from 'react-native';
import TotalListCardItem, {TotalListCardItemProps} from './TotalListCardItem';

export type TotalCardProps = {
    list: TotalListCardItemProps[];
};

const TotalListCard = ({list}: TotalCardProps) => {
    return (
        <View style={styles.list}>
            {list.map(item => (
                <TotalListCardItem {...item} key={item.label} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 14,
        marginVertical: 20,
        borderRadius: 10,
        elevation: 40,
        shadowColor: 'rgba(153, 161, 169, 0.7)',
        shadowOffset: {
            width: 400,
            height: 20,
        },
        shadowRadius: 10,
        backgroundColor: '#ffff',
        marginHorizontal: 14,
        marginBottom: 40,
    },
});

export default React.memo(TotalListCard);
