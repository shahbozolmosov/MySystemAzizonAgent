import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel';
import CustomerOrderCanceled from '../../screens/customer/CustomerOrderCanceledScreen';
import CustomerOrderDelivered from '../../screens/customer/CustomerOrderDeliveredScreen';
import CustomerOrderProcess from '../../screens/customer/CustomerOrderProcessScreen';
import {CustomerTabStackParamList} from './CustomerStack';
import IconButton from '../../components/ui/IconButton/IconButton';

export type CustomerOrderHistoryTabStackParamList = {
  Process: {customerId: string};
  Delivered: {customerId: string};
  Canceled: {customerId: string};
};

type CustomerOrderHistoryTabStackProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderHistory'
>;

type TabBarLabelProps = {
  focused: boolean;
  color: string;
  children: string;
};

const Tab =
  createMaterialTopTabNavigator<CustomerOrderHistoryTabStackParamList>();

const {width} = Dimensions.get('window');

const CustomerOrderHistoryTabStack = ({
  navigation,
  route,
}: CustomerOrderHistoryTabStackProps) => {
  // Route
  const {customerId} = route.params;

  // Handle navigate to order add
  const handleNavigate = useCallback(() => {
    navigation.push('CustomerOrderAdd', {customerId});
  }, [navigation, customerId]);

  const tabBarLabel = useCallback(
    (props: TabBarLabelProps, tabRoute: {name: string}) => {
      let label = 'Jarayonda';

      switch (tabRoute.name) {
        case 'Delivered':
          label = 'Yetkazildi';
          break;
        case 'Canceled':
          label = 'Bekor qilindi ';
          break;
      }

      return <TabBarLabel {...props} label={label} />;
    },
    [],
  );

  return (
    <>
      <CustomerHeaderOperation
        title="Buyurtmalar"
        customElements={
          <>
            <IconButton icon="filter" />
            <Button
              title={'Yangi'}
              size="sm"
              color={'secondary'}
              onPress={handleNavigate}
              containerStyle={styles.addBtnContainer}
            />
          </>
        }
        borderShown={false}
      />
      <Tab.Navigator
        initialRouteName="Process"
        screenOptions={({route: TabRoute}) => ({
          tabBarStyle: {
            elevation: 0,
            paddingHorizontal: 10,
          },
          tabBarItemStyle: {
            width: 100,
            minWidth: 80,
          },
          tabBarLabel: props => tabBarLabel(props, TabRoute),
          tabBarIndicatorStyle: {
            width: 60,
            marginLeft: 30,
            height: 4,
            backgroundColor: '#1e232c',
            borderRadius: 16,
          },
          tabBarGap: 10,
          tabBarPressColor: 'transparent',
          tabBarScrollEnabled: true,
        })}>
        <Tab.Screen
          name="Process"
          component={CustomerOrderProcess}
          initialParams={{customerId}}
        />
        <Tab.Screen
          name="Delivered"
          component={CustomerOrderDelivered}
          initialParams={{customerId}}
        />
        <Tab.Screen
          name="Canceled"
          component={CustomerOrderCanceled}
          initialParams={{customerId}}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  addBtnContainer: {
    paddingVertical: 4,
    marginLeft: 8,
  },
});

export default React.memo(CustomerOrderHistoryTabStack);
