import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TextStyle} from 'react-native';
import TableRow, {TableColumn, TableRowProps} from './TableRow';
import {ScrollView} from 'react-native-gesture-handler';

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
        <ScrollView horizontal={true}>
            <View>
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
                    style={{width: 600}}
                    data={data}
                    renderItem={({item}) => renderItem({item, columns})}
                    keyExtractor={keyExtractor}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: 600,
    },
    headerCell: {
        flex: 1,
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontWeight: '400',
        color: '#1e232c',
    },
});

export default React.memo(Table);
