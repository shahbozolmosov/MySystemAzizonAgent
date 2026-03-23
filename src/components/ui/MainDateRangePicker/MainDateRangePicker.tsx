import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TDate} from '../../../types/types';

type MainDateRangePickerProps = {
    setValue: ({start, end}: TDate) => void;
};

const MainDateRangePicker = ({setValue}: MainDateRangePickerProps) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const formatDate = useCallback((date: Date, type?: string) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        if (type === 'dot') {
            return `${day}.${month}.${year}`;
        }
        return `${day}-${month}-${year}`;
    }, []);

    useEffect(() => {
        setValue({
            start: formatDate(startDate, 'dot'),
            end: formatDate(endDate, 'dot'),
        });
    }, [endDate, formatDate, setValue, startDate]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sana 1</Text>
                <TouchableOpacity
                    onPress={() => setShowStartPicker(true)}
                    style={styles.input}>
                    <Text style={styles.inputText}>
                        {formatDate(startDate)}
                    </Text>
                </TouchableOpacity>
            </View>

            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sana 2</Text>
                <TouchableOpacity
                    onPress={() => setShowEndPicker(true)}
                    style={styles.input}>
                    <Text style={styles.inputText}>{formatDate(endDate)}</Text>
                </TouchableOpacity>
            </View>

            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Roboto-Light',
        fontSize: 12,
        fontWeight: '300',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 6,
        borderRadius: 6,
        textAlign: 'center',
    },
    inputText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
});

export default React.memo(MainDateRangePicker);
