import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../ui/HeaderTitle/HeaderTitle.tsx';
import IconButton from '../../ui/IconButton/IconButton';
import SearchInput from '../../ui/SearchInput/SearchInput';

type HeaderOperationProps = {
    customElements?: React.ReactNode;
    title: string;
    showSearch?: boolean;
    setSearchVal?: (value: string) => void;
    borderShown?: boolean;
    onBack: () => void;
};

const HeaderOperation: React.FC<HeaderOperationProps> = ({
    customElements,
    title,
    showSearch,
    setSearchVal,
    borderShown = true,
    onBack,
}) => {
    // Ref
    const searchRef = useRef<TextInput>(null);

    // State
    const [showSearchInput, setShowSearchInput] = useState(false);

    // Handle back
    const handleBack = useCallback(() => {
        onBack();
    }, [onBack]);

    // Handle show search input
    const handleShowSearchInput = useCallback(() => {
        setShowSearchInput(prev => !prev);
    }, []);

    useEffect(() => {
        if (showSearchInput && searchRef.current) {
            searchRef.current?.focus();
        }
    }, [showSearchInput]);

    // Handle change
    const handleChange = useCallback(
        (val: string) => {
            if (setSearchVal) {
                setSearchVal(val);
            }
        },
        [setSearchVal],
    );

    return showSearchInput ? (
        <View style={[styles.container, borderShown && styles.border]}>
            <SearchInput
                inputRef={searchRef}
                setValue={handleChange}
                onCancel={handleShowSearchInput}
            />
        </View>
    ) : (
        <View style={[styles.container, borderShown && styles.border]}>
            {/* Back Button */}
            <TouchableOpacity onPress={handleBack}>
                <Icon name="chevron-left" size={24} color={'#22282b'} />
            </TouchableOpacity>

            {/* Header Title */}
            <HeaderTitle title={title} />

            {/* Right Side Buttons */}
            <View style={styles.customElements}>
                {showSearch && (
                    <IconButton icon="search" onPress={handleShowSearchInput} />
                )}
                {customElements}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        textAlign: 'center',
        color: '#22282b',
    },
    customElements: {
        flexDirection: 'row',
        gap: 0,
    },
    searchContainer: {
        flex: 1,
    },
});

export default memo(HeaderOperation);
