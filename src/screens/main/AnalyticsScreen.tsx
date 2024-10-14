import React from 'react';
import Container from '../../components/common/Container/Container';
import DashboardCardList from '../../components/common/DashboardCard/DashboardCardList';

const AnalyticsScreen = () => {
    return (
        <Container paddingHorizontal={14}>
            <DashboardCardList />
        </Container>
    );
};

export default AnalyticsScreen;
