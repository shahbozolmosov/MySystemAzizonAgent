import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack.tsx';
import DrawerItemBtn from '../../ui/DrawerItemBtn/DrawerItemBtn.tsx';
import DrawerProfile from '../DrawerProfile/DrawerProfile.tsx';

type DrawerProfileNavigationProp =
    DrawerNavigationProp<AppRootDrawerStackParamList>;

const CustomerDrawerContent = () => {
    const navigation = useNavigation<DrawerProfileNavigationProp>();

    return (
        <>
            <DrawerProfile />
            <DrawerItemBtn
                label="Sozlamalar"
                icon="settings"
                onPress={() => navigation.navigate('Profile')}
            />
        </>
    );
};

export default React.memo(CustomerDrawerContent);
