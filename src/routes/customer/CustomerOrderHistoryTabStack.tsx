import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel';
import CustomerOrderCanceled from '../../screens/customer/CustomerOrderCanceled';
import CustomerOrderDelivered from '../../screens/customer/CustomerOrderDelivered';
import CustomerOrderProcess from '../../screens/customer/CustomerOrderProcess';
import {CustomerTabStackParamList} from './CustomerStack';

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
    navigation.push('CustomerOrderAddScreen', {customerId});
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
          <Button
            title={'Yangi'}
            size="sm"
            color={'secondary'}
            onPress={handleNavigate}
          />
        }
        borderShown={false}
      />
      <Tab.Navigator
        initialRouteName="Process"
        screenOptions={({route}) => ({
          tabBarStyle: {
            elevation: 0,
            paddingHorizontal: 10,
          },
          tabBarItemStyle: {
            // width: 'auto', // Make each tab's width fit its content
            minWidth: 80, // Optional: Set a minimum width if needed
          },
          // Use custom label with Text and optional View for more customization
          tabBarLabel: props => tabBarLabel(props, route),
          tabBarIndicatorStyle: {
            width: width / 3 - 60,
            marginLeft: 40,
            height: 4,
            backgroundColor: '#1e232c',
            borderRadius: 16,
          },
          tabBarPressColor: 'transparent',
        })}>
        <Tab.Screen
          name="Process"
          component={CustomerOrderProcess}
          initialParams={{customerId: '1'}}
        />
        <Tab.Screen name="Delivered" component={CustomerOrderDelivered} />
        <Tab.Screen name="Canceled" component={CustomerOrderCanceled} />
      </Tab.Navigator>
    </>
  );
};

export default React.memo(CustomerOrderHistoryTabStack);
