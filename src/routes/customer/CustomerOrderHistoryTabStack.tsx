import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CustomerHeaderOperation from '../../components/customer/CustomerOperation/CustomerHeaderOperation';
import TabBarLabel from '../../components/ui/TabBar/TabBarLabel';
import CustomerOrderCanceled from '../../screens/customer/CustomerOrderCanceledScreen';
import CustomerOrderDelivered from '../../screens/customer/CustomerOrderDeliveredScreen';
import CustomerOrderProcess from '../../screens/customer/CustomerOrderProcessScreen';
import {CustomerTabStackParamList} from './CustomerStack';
import IconButton from '../../components/ui/IconButton/IconButton';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabBarLabelProps} from '../../types/types.ts';

export type CustomerOrderHistoryTabStackParamList = {
  Process: {customerId: string};
  Delivered: {customerId: string};
  Canceled: {customerId: string};
};

type CustomerOrderHistoryTabStackProps = NativeStackScreenProps<
  CustomerTabStackParamList,
  'CustomerOrderHistory'
>;

const Tab =
  createMaterialTopTabNavigator<CustomerOrderHistoryTabStackParamList>();

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
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleNavigate} style={styles.addBtnContainer}>
        <Icon name={'plus'} size={20} color={'#ffffff'} />
      </Pressable>

      <CustomerHeaderOperation
        title="Buyurtmalar"
        customElements={
          <>
            <IconButton icon="filter" />
          </>
        }
        borderShown={false}
      />
      <Tab.Navigator
        initialRouteName="Process"
        screenOptions={({route: TabRoute}) => ({
          tabBarStyle: {
            elevation: 0,
          },
          tabBarLabel: props => tabBarLabel(props, TabRoute),
          tabBarIndicatorStyle: {
            height: 4,
            backgroundColor: '#1e232c',
            borderRadius: 16,
          },
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
    flex: 1,
  },
  addBtnContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,

    width: 50,
    height: 50,
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007fff',

    borderRadius: 50 / 2,
    elevation: 10,
    shadowColor: 'rgba(153, 161, 169, 1)',
    shadowOffset: {
      width: 44,
      height: 44,
    },
    shadowRadius: 10,

    zIndex: 1,
  },
});

export default React.memo(CustomerOrderHistoryTabStack);
