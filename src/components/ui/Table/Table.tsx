import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TextStyle} from 'react-native';
import TableRow, {TableColumn, TableRowProps} from './TableRow';

type TableProps<T> = {
    columns: TableColumn[];
    data: T[];
};

type AlignType = 'center' | 'left' | 'right';

const Table = <T,>({columns, data}: TableProps<T>) => {
    const renderItem = useCallback((items: TableRowProps<T>) => {
        return <TableRow {...items} />;
    }, []);

    const keyExtractor = useCallback(
        (item: T, index: number) => {
            const primaryKeyColumn = columns.find(
                column => column.dataIndex === 'id',
            ); // Assuming 'id' is the key field
            return primaryKeyColumn
                ? String(item[primaryKeyColumn.dataIndex as keyof T])
                : String(index);
        },
        [columns],
    );

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

    return (
        <>
            <View style={styles.header}>
                {columns.map(({dataIndex, align = 'center', title}) => (
                    <Text
                        style={[styles.headerCell, getAlignStyle(align)]}
                        key={dataIndex}>
                        {title}
                    </Text>
                ))}
            </View>

            <FlatList
                data={data}
                renderItem={({item}) => renderItem({item, columns})}
                keyExtractor={keyExtractor}
            />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default React.memo(Table);
