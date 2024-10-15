import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ImageRequireSource} from 'react-native';
import {
    DashboardItem,
    useGetDashboardQuery,
} from '../../app/services/dashboard/dashboard';
import Container from '../../components/common/Container/Container';
import {DashboardCardProps} from '../../components/common/DashboardCard/DashboardCard';
import DashboardCardList from '../../components/common/DashboardCard/DashboardCardList';
import {handleApiResponse} from '../../utils/handleApiResponse';
// Icons
import {useIsFocused} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import OrderIcon from '../../../assets/icons/order-icon.png';
import PaymentIcon from '../../../assets/icons/payment-icon.png';
import SalesIcon from '../../../assets/icons/sales-icon.png';
import UsersIcon from '../../../assets/icons/users-icon.png';
import NoResult from '../../components/errors/NoResult/NoResult';
import {TDate} from '../../types/types';
import MainDateRangePicker from '../../components/ui/MainDateRangePicker/MainDateRangePicker';

const AnalyticsScreen = () => {
    // State
    const [date, setDate] = useState<TDate>({
        start: '01.09.2024',
        end: '30.09.2024',
    });

    const isFocused = useIsFocused();

    // APi
    const dashboardRes = useGetDashboardQuery(date, {
        skip: !isFocused,
    });

    // Memo
    const totalData = useMemo<DashboardCardProps[]>(() => {
        return handleApiResponse<DashboardItem[]>(dashboardRes).map(item => {
            let icon: ImageRequireSource = UsersIcon;
            switch (item.icon_key) {
                case 'visit':
                    icon = OrderIcon;
                    break;
                case 'orders':
                    icon = OrderIcon;
                    break;
                case 'default':
                    icon = PaymentIcon;
                    break;
                default:
                    icon = SalesIcon;
            }
            return {
                ...item,
                icon,
            };
        });
    }, [dashboardRes]);

    useEffect(() => {
        if (
            !dashboardRes.isLoading &&
            !dashboardRes.isFetching &&
            dashboardRes.isError
        ) {
            Toast.show({
                type: 'info',
                text1: 'Ulanishda xatolik',
                text2: "Qaytadan urinib ko'ring yoki biz bilan bog'laning",
            });
        }
    }, [dashboardRes]);

    const handleChangeDate = useCallback((value: TDate) => {
        setDate(value);
    }, []);

    return (
        <Container>
            <MainDateRangePicker setValue={handleChangeDate} />
            {dashboardRes.isLoading || dashboardRes.isFetching ? (
                <Text>Yuklanmoqda...</Text>
            ) : !totalData ? (
                <NoResult
                    title="Ma'lumot topilmadi"
                    desc="Hozircha sizda jami ma'lumotlar topilmadi"
                />
            ) : (
                <DashboardCardList list={totalData} />
            )}
        </Container>
    );
};

export default AnalyticsScreen;
