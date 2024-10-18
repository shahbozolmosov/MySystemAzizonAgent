import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack.tsx';
import DrawerItemBtn from '../../ui/DrawerItemBtn/DrawerItemBtn.tsx';
import DrawerProfile from '../DrawerProfile/DrawerProfile.tsx';

type DrawerProfileNavigationProp =
    DrawerNavigationProp<AppRootDrawerStackParamList>;

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
                onPress={() => navigation.navigate('AppOrderStack')}
            />
            <DrawerItemBtn
                label="Mijozlar debet & kredit"
                icon="file-text"
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
