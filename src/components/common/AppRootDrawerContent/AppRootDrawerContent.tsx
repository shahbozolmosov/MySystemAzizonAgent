import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {AppDrawerStackParamList} from '../../../routes/App/AppRootStack.tsx';
import DrawerItemBtn from '../../ui/DrawerItemBtn/DrawerItemBtn.tsx';
import DrawerProfile from '../DrawerProfile/DrawerProfile.tsx';

type DrawerProfileNavigationProp =
    DrawerNavigationProp<AppDrawerStackParamList>;

const AppRootDrawerContent = () => {
    const navigation = useNavigation<DrawerProfileNavigationProp>();

    return (
        <>
            <DrawerProfile />
            <DrawerItemBtn
                label="Yangi mijoz"
                icon="user"
                onPress={() => navigation.navigate('CustomerAdd')}
            />
            <DrawerItemBtn
                label="Buyurtmalar"
                icon="inbox"
                onPress={() => navigation.navigate('AppOrderHistoryStack')}
            />
            <DrawerItemBtn
                label="Mijozlar hisoboti"
                icon="users"
                onPress={() => navigation.navigate('CustomerReport')}
            />
            <DrawerItemBtn
                label="Sozlamalar"
                icon="settings"
                onPress={() => navigation.navigate('Profile')}
            />
        </>
    );
};

export default React.memo(AppRootDrawerContent);
