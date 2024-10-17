import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useCallback} from 'react';

type AlignType = 'center' | 'left' | 'right';
export type TableColumn = {
    title: string;
    dataIndex: string;
    align?: AlignType;
};

export type TableRow<T> = T;

export type TableRowProps<T> = {
    item: TableRow<T>;
    columns: TableColumn[];
};

const TableRow = <T,>({item, columns}: TableRowProps<T>) => {
    const getAlignStyle = useCallback(
        (align: AlignType): TextStyle | undefined => {
            switch (align) {
                case 'center':
                    return {
                        textAlign: 'center',
                    };
                case 'left':
                    return {
                        textAlign: 'left',
                    };
                case 'right':
                    return {
                        textAlign: 'right',
                    };
                default:
                    return undefined;
            }
        },
        [],
    );

    const getVal = useCallback(
        ({dataIndex}: {dataIndex: string}) => {
            if (!item[dataIndex as keyof T]) {
                return '';
            }
            if (
                typeof item[dataIndex as keyof T] === 'number' &&
                dataIndex !== 'id'
            ) {
                return item[dataIndex as keyof T]?.toLocaleString();
            }

            return item[dataIndex as keyof T]?.toString() || '';
        },
        [item],
    );

    return (
        <View style={styles.row}>
            {columns.map(({dataIndex, align = 'center'}) => (
                <Text
                    style={[styles.cell, getAlignStyle(align)]}
                    key={dataIndex}>
                    {getVal({dataIndex})}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});
export default TableRow;
